/**
 * Converts limited HTML (from Tiptap editor) into @react-pdf/renderer elements.
 * Supports: <p>, <br>, <ul>, <ol>, <li>, <strong>/<b>, <em>/<i>, <u>, <a>, plain text.
 */
import React from "react";
import { Text, View, Link } from "@react-pdf/renderer";
import { Style } from "@react-pdf/types";

interface ParseOpts {
  fontSize: number;
  color: string;
  lineHeight: number;
  linkColor?: string;
  bulletChar?: string;
}

/** Strip HTML tags and decode basic entities */
function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ");
}

/** Lightweight DOM-less HTML parser that produces react-pdf elements */
export function htmlToRichText(html: string, opts: ParseOpts): React.ReactNode {
  if (!html || !html.trim()) return null;

  // If no HTML tags at all, return plain text
  if (!/<[a-z][\s\S]*>/i.test(html)) {
    return (
      <Text style={{ fontSize: opts.fontSize, color: opts.color, lineHeight: opts.lineHeight }}>
        {html}
      </Text>
    );
  }

  const elements: React.ReactNode[] = [];
  let key = 0;

  // Split into top-level blocks
  const blocks = html
    .replace(/\n/g, "")
    .split(/(?=<(?:p|ul|ol|li|br|h[1-6])[\s>])|(?<=<\/(?:p|ul|ol|li|h[1-6])>)/i)
    .filter(Boolean);

  for (const block of blocks) {
    const trimmed = block.trim();
    if (!trimmed) continue;

    // Handle <ul>...</ul>
    if (/^<ul[\s>]/i.test(trimmed)) {
      const items = trimmed.match(/<li[\s>][^]*?<\/li>/gi) || [];
      for (const item of items) {
        const content = item.replace(/<\/?li[^>]*>/gi, "").replace(/<\/?p[^>]*>/gi, "");
        const inlineChildren = renderInlineContent(content, opts);
        // Use a single <Text> with nested <Text> children so bullet + text stay on one line
        elements.push(
          <Text key={key++} style={{ fontSize: opts.fontSize, color: opts.color, lineHeight: opts.lineHeight, marginBottom: 2 }}>
            <Text style={{ width: 12 }}>{opts.bulletChar || "•"}  </Text>
            {inlineChildren}
          </Text>
        );
      }
      continue;
    }

    // Handle <ol>...</ol>
    if (/^<ol[\s>]/i.test(trimmed)) {
      const items = trimmed.match(/<li[\s>][^]*?<\/li>/gi) || [];
      items.forEach((item, idx) => {
        const content = item.replace(/<\/?li[^>]*>/gi, "").replace(/<\/?p[^>]*>/gi, "");
        const inlineChildren = renderInlineContent(content, opts);
        elements.push(
          <Text key={key++} style={{ fontSize: opts.fontSize, color: opts.color, lineHeight: opts.lineHeight, marginBottom: 2 }}>
            <Text>{idx + 1}.  </Text>
            {inlineChildren}
          </Text>
        );
      });
      continue;
    }

    // Handle bare <li> (not inside ul/ol)
    if (/^<li[\s>]/i.test(trimmed)) {
      const content = trimmed.replace(/<\/?li[^>]*>/gi, "").replace(/<\/?p[^>]*>/gi, "");
      const inlineChildren = renderInlineContent(content, opts);
      elements.push(
        <Text key={key++} style={{ fontSize: opts.fontSize, color: opts.color, lineHeight: opts.lineHeight, marginBottom: 2 }}>
          <Text>{opts.bulletChar || "•"}  </Text>
          {inlineChildren}
        </Text>
      );
      continue;
    }

    // Handle <br> / <br/>
    if (/^<br\s*\/?>/i.test(trimmed)) {
      elements.push(<Text key={key++} style={{ fontSize: opts.fontSize / 2 }}>{"\n"}</Text>);
      continue;
    }

    // Handle <p>...</p> or any other block
    const inner = trimmed.replace(/<\/?p[^>]*>/gi, "").replace(/<br\s*\/?>/gi, "\n");
    if (inner.trim()) {
      const inlineChildren = renderInlineContent(inner, opts);
      elements.push(
        <Text key={key++} style={{ fontSize: opts.fontSize, color: opts.color, lineHeight: opts.lineHeight, marginBottom: 2 }}>
          {inlineChildren}
        </Text>
      );
    }
  }

  return <>{elements}</>;
}

/** Render inline HTML (bold, italic, underline, links) as <Text> with nested styles */
function renderInlineHtml(html: string, opts: ParseOpts): React.ReactNode {
  const baseStyle: Style = {
    fontSize: opts.fontSize,
    color: opts.color,
    lineHeight: opts.lineHeight,
  };

  // Tokenize inline HTML
  const tokens = tokenizeInline(html);
  if (tokens.length === 0) return null;
  if (tokens.length === 1 && tokens[0].type === "text") {
    return <Text style={baseStyle}>{decodeEntities(tokens[0].content)}</Text>;
  }

  const children: React.ReactNode[] = [];
  let k = 0;

  for (const token of tokens) {
    if (token.type === "text") {
      children.push(<Text key={k++} style={baseStyle}>{decodeEntities(token.content)}</Text>);
    } else if (token.type === "bold") {
      children.push(<Text key={k++} style={{ ...baseStyle, fontWeight: 700 }}>{decodeEntities(token.content)}</Text>);
    } else if (token.type === "italic") {
      children.push(<Text key={k++} style={{ ...baseStyle, fontStyle: "italic" }}>{decodeEntities(token.content)}</Text>);
    } else if (token.type === "underline") {
      children.push(<Text key={k++} style={{ ...baseStyle, textDecoration: "underline" }}>{decodeEntities(token.content)}</Text>);
    } else if (token.type === "link") {
      children.push(
        <Link key={k++} src={token.href || "#"} style={{ ...baseStyle, color: opts.linkColor || "#2563eb", textDecoration: "underline" }}>
          {decodeEntities(token.content)}
        </Link>
      );
    }
  }

  return <Text style={baseStyle}>{children}</Text>;
}

interface InlineToken {
  type: "text" | "bold" | "italic" | "underline" | "link";
  content: string;
  href?: string;
}

function tokenizeInline(html: string): InlineToken[] {
  const tokens: InlineToken[] = [];
  // Regex to find inline tags
  const regex = /<(strong|b|em|i|u|a)(\s[^>]*)?>([^]*?)<\/\1>/gi;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(html)) !== null) {
    // Text before this tag
    if (match.index > lastIndex) {
      const text = html.slice(lastIndex, match.index);
      if (text) tokens.push({ type: "text", content: text });
    }

    const tag = match[1].toLowerCase();
    const attrs = match[2] || "";
    const content = stripHtml(match[3]);

    if (tag === "strong" || tag === "b") {
      tokens.push({ type: "bold", content });
    } else if (tag === "em" || tag === "i") {
      tokens.push({ type: "italic", content });
    } else if (tag === "u") {
      tokens.push({ type: "underline", content });
    } else if (tag === "a") {
      const hrefMatch = attrs.match(/href="([^"]*)"/);
      tokens.push({ type: "link", content, href: hrefMatch?.[1] });
    }

    lastIndex = match.index + match[0].length;
  }

  // Remaining text
  if (lastIndex < html.length) {
    const remaining = html.slice(lastIndex);
    if (remaining) tokens.push({ type: "text", content: stripHtml(remaining) });
  }

  return tokens;
}

function decodeEntities(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ");
}
