#!/usr/bin/env python3
"""
Generate PDF documents from HTML files using WeasyPrint.
Used by the Document Carousel skill to convert styled HTML into polished PDFs.
"""

import argparse
import os
import sys


def generate_pdf(input_html, output_pdf):
    """
    Convert an HTML file to PDF using WeasyPrint.

    Args:
        input_html: Path to the source HTML file
        output_pdf: Path for the output PDF file
    """
    try:
        from weasyprint import HTML
    except ImportError:
        print("ERROR: weasyprint is not installed.")
        print("Install it with: pip3 install weasyprint")
        print("You may also need system dependencies:")
        print("  Ubuntu/Debian: sudo apt-get install -y libpango-1.0-0 libpangocairo-1.0-0 libgdk-pixbuf2.0-0 libffi-dev libcairo2")
        print("  macOS: brew install pango libffi cairo gdk-pixbuf")
        sys.exit(1)

    if not os.path.exists(input_html):
        raise FileNotFoundError(f"HTML file not found: {input_html}")

    os.makedirs(os.path.dirname(output_pdf) or ".", exist_ok=True)

    print(f"Converting HTML to PDF...")
    print(f"  Input:  {input_html}")
    print(f"  Output: {output_pdf}")

    # Use the HTML file's directory as the base URL for resolving relative paths
    base_url = os.path.dirname(os.path.abspath(input_html))

    html = HTML(filename=input_html, base_url=base_url)
    html.write_pdf(output_pdf)

    file_size = os.path.getsize(output_pdf)
    print(f"PDF generated successfully: {output_pdf} ({file_size / 1024:.1f} KB)")
    return output_pdf


def main():
    parser = argparse.ArgumentParser(description="Convert HTML documents to PDF")
    parser.add_argument("--input", type=str, required=True,
                        help="Path to the input HTML file")
    parser.add_argument("--output", type=str, required=True,
                        help="Path for the output PDF file")

    args = parser.parse_args()

    try:
        generate_pdf(args.input, args.output)
        print("SUCCESS")
    except Exception as e:
        print(f"ERROR: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()
