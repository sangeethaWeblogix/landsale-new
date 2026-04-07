"use client";
import Link from "next/link";
import "./footer.css";
import Image from "next/image";
import { STATE_NAMES } from "@/config";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="inner-footer">
        <div className="container">
          <div className="row">

            {/* Column 1 */}
            <div className="col-lg-3 col-md-6">
              <div className="footer-col-block">
                <div className="fw-7 text-white footer-heading-mobile">
                  Popular Estates <br /> & Land For Sale by State
                </div>
                <div className="tf-collapse-content">
                  <ul className="mt-10 navigation-menu-footer">
                    {STATE_NAMES.filter((item) => item.code !== "nt").map(
                      (item) => (
                        <li key={item.code}>
                          <Link
                            href={`/${item.slug}`}
                            className="caption-1 text-variant-2"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              </div>
            </div>

            {/* Column 2 */}
            <div className="col-lg-6 col-md-6">
              <div className="footer-col-block">
                <div className="fw-7 text-white footer-heading-mobile">
                  Land For Sale by Region
                </div>
                <div className="tf-collapse-content">
                  <ul className="mt-10 navigation-menu-footer three_colm">
                    {[
                      "Central Coast","Gold Coast","Newcastle","Sydney North West",
                      "Sydney South West","Wollongong","Brisbane","Cairns",
                      "Hervey Bay","Sunshine Coast","Toowoomba","Bunbury",
                      "Mandurah","Perth North East","Perth North West",
                      "Perth South West","Geelong","Ballarat","Bendigo",
                      "Gippsland","Melbourne West","Melbourne East",
                      "Adelaide Hills","Adelaide North","Adelaide South",
                    ].map((region, i) => (
                      <li key={i}>
                        <Link href="#" className="caption-1 text-variant-2">
                          {region}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Column 3 */}
            <div className="col-lg-3 col-md-6">
              <div className="footer-col-block">
                <div className="fw-7 text-white footer-heading-mobile">
                  Quick Links
                </div>
                <div className="tf-collapse-content">
                  <ul className="mt-10 navigation-menu-footer">
                    <li><Link href="/blog" className="caption-1 text-variant-2">Blog</Link></li>
                    <li><Link href="/contact" className="caption-1 text-variant-2">Contact Us</Link></li>
                    <li><Link href="/disclaimer" className="caption-1 text-variant-2">Disclaimer</Link></li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Top Footer */}
      <div className="top-footer">
        <div className="container">
          <div className="content-footer-top">
            <div className="footer-logo">
              <Link href="/">
                <Image
                  src="/images/logo-white.svg"
                  alt="logo"
                  width={226}
                  height={48}
                />
              </Link>
            </div>

            <div className="wd-social">
              <ul className="list-social d-flex align-items-center">

                {/* Facebook */}
                <li>
                  <a
                    href="https://www.facebook.com/landsales.com.au"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="box-icon w-40 social"
                  >
                    <svg width="9" height="16" viewBox="0 0 9 16" fill="none">
                      <path d="M7.60547 9L8.00541 6.10437H5.50481V4.22531C5.50481 3.43313 5.85413 2.66094 6.97406 2.66094H8.11087V0.195625C8.11087 0.195625 7.07925 0 6.09291 0C4.03359 0 2.68753 1.38688 2.68753 3.8975V6.10437H0.398438V9H2.68753V16H5.50481V9H7.60547Z" fill="white" />
                    </svg>
                  </a>
                </li>

                {/* Instagram */}
                <li>
                  <a
                    href="https://www.instagram.com/landsales.com.au/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="box-icon w-40 social"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M6.99812 4.66567C5.71277 4.66567 4.66383 5.71463 4.66383 7C4.66383 8.28537 5.71277 9.33433 6.99812 9.33433C8.28346 9.33433 9.3324 8.28537 9.3324 7C9.3324 5.71463 8.28346 4.66567 6.99812 4.66567ZM13.9992 7C13.9992 6.03335 14.008 5.07545 13.9537 4.11055C13.8994 2.98979 13.6437 1.99512 12.8242 1.17556C12.0029 0.35426 11.01 0.100338 9.88927 0.0460516C8.92263 -0.00823506 7.96475 0.000520879 6.99987 0.000520879C6.03323 0.000520879 5.07536 -0.00823506 4.11047 0.0460516C2.98973 0.100338 1.99508 0.356011 1.17554 1.17556C0.354253 1.99687 0.100336 2.98979 0.0460508 4.11055C-0.00823491 5.0772 0.00052087 6.0351 0.00052087 7C0.00052087 7.9649 -0.00823491 8.92455 0.0460508 9.88945C0.100336 11.0102 0.356004 12.0049 1.17554 12.8244C1.99683 13.6457 2.98973 13.8997 4.11047 13.9539C5.07711 14.0082 6.03499 13.9995 6.99987 13.9995C7.9665 13.9995 8.92438 14.0082 9.88927 13.9539C11.01 13.8997 12.0047 13.644 12.8242 12.8244C13.6455 12.0031 13.8994 11.0102 13.9537 9.88945C14.0097 8.92455 13.9992 7.96665 13.9992 7ZM6.99812 10.5917C5.01056 10.5917 3.40651 8.98759 3.40651 7C3.40651 5.01241 5.01056 3.40832 6.99812 3.40832C8.98567 3.40832 10.5897 5.01241 10.5897 7C10.5897 8.98759 8.98567 10.5917 6.99812 10.5917ZM10.7368 4.10004C10.2728 4.10004 9.89802 3.72529 9.89802 3.26122C9.89802 2.79716 10.2728 2.42241 10.7368 2.42241C11.2009 2.42241 11.5756 2.79716 11.5756 3.26122C11.5758 3.37142 11.5542 3.48056 11.5121 3.58239C11.47 3.68422 11.4082 3.77675 11.3303 3.85467C11.2523 3.93258 11.1598 3.99437 11.058 4.03647C10.9562 4.07858 10.847 4.10018 10.7368 4.10004Z" fill="white" />
                    </svg>
                  </a>
                </li>

              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bottom-footer">
        <div className="container">
          <div className="content-footer-bottom">
            <div className="copyright">
              <p>© 2025 landsales.com.au pty ltd. All Rights Reserved</p>
              <p>ABN : 68 683 619 918</p>
              <div className="dis_cl">
                <p>
                  <strong>Disclaimer:</strong> The information provided on landsales.com.au has been obtained from publicly available sources. While we make every effort to ensure the accuracy and reliability of the information, we do not guarantee its completeness, timeliness, or suitability for any particular purpose. Users should verify any details before making decisions based on the content provided.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

