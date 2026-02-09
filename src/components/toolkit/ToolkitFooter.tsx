import { Link } from "react-router-dom";

const ToolkitFooter = () => {
  return (
    <footer className="py-8 px-5 md:px-6 border-t border-border">
      <div className="container mx-auto max-w-4xl text-center">
        <p className="text-muted-foreground text-sm">
          From the Salary Negotiation Toolkit by{" "}
          <Link to="/" className="text-gold hover:underline">James Bugden</Link>
          . Get the full 5-email series →{" "}
          <Link to="/" className="text-gold hover:underline">Subscribe</Link>
        </p>
      </div>
    </footer>
  );
};

export default ToolkitFooter;
