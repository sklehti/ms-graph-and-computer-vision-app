import { MDBFooter } from "mdb-react-ui-kit";

function Footer() {
  return (
    <MDBFooter className="footer-style">
      <div className="text-center p-4">
        &copy; {new Date().getFullYear()} Tietoja tulossa myöhemmin.
      </div>
    </MDBFooter>
  );
}

export default Footer;
