type FooterProps = {
  ownerName: string;
  footer: {
    spanish: string;
    chinese: string;
  };
};

function Footer({ footer, ownerName }: FooterProps) {
  return (
    <footer className="site-footer">
      <p className="footer-logo">{ownerName}</p>
      <p>{footer.spanish}</p>
      <p>{footer.chinese}</p>
    </footer>
  );
}

export default Footer;
