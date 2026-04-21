"use client";
import "./suburbs.css";
type Props = {
  state: string;
  region: string;
  suburb: string;
  postcode?: string;
  data: any;
};

export default function LandPage({
  state,
  region,
  suburb,
  postcode,
  data,
}: Props) { 
    const formatName = (name: string) =>
    name.replace(/\b\w/g, (c) => c.toUpperCase());
    const suburbName = formatName(suburb.replace(/-/g, " "));
console.log("data", data)
const landListings = data?.land_listings ?? [];
  const estateListings = data?.estate_listings ?? [];
  const houseAndLandListings = data?.house_and_land_listings ?? [];
  const nearbyLand = data?.nearby_land ?? [];
  return (
  
    <>
      {/* Top Section */}
      <section className="section-top-map find_map_location">
        <div className="wrap-map">
          <h1 className="dynamic-title">
            Land for Sale in {suburbName} {state.toLocaleUpperCase()}
          </h1>
        </div>
      </section>


{landListings.length > 0 && (
<>
      {/* All Land Listings */}
      <section className="flat-section slider_new flat-categories-1 arrow_shadow bg_color_1">
        <div className="container">
          <div className="box-title style-1 wow fadeInUp">
            <div className="row">
              <div className="col-lg-9">
                <div className="row">
                  <div className="col-lg-12">
                    <h3 className="title text-start">
                      Land Listings in  {suburbName} {state.toLocaleUpperCase()}
                    </h3>
                  </div>
                  {/* Card 1 */}
                    <div className="row">
            {landListings.map((item: any) => (
              <div className="col-lg-4" key={item.estate_id}>
                    <a   href={`/land/${item.estate_slug}`} className="homelengo-categories">
                      <div className="listing-card">
                        <div className="image_card">
                          <img src={item.image} alt="" />
                        </div>
                        <div className="info_content">
                          <h4>Lot {item.lot_count} { }{item.estate_name
}</h4>
                          <p className="location">
                            <i className="icon icon-mapPin"></i> {suburbName} {postcode}
                          </p>
                          <div className="price">
                            <span className="price_data">${item.lowest_price
    ? Number(item.lowest_price
).toLocaleString("en-IN")
    : "0"}</span>
                            <button className="btn-primary">
                              View Details <i className="icon icon-arr-r"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
 
                          ))}
                  {/* Button */}
                  <div className="col-lg-12">
                    <button className="all-listing-button">
                      View All Land <i className="icon icon-arr-r"></i>
                    </button>
                  </div>
                </div>
                <hr></hr>


                  { estateListings.length > 0 && (
                    <>

                <div className="row">
                  <div className="col-lg-12">
                    <h3 className="title text-start">
                      Estate Listings in {suburbName} {state.toLocaleUpperCase()}
                    </h3>
                  </div>

                  {/* Card 1 */}
                 <div className="row">
            {estateListings.map((item: any) => (
              <div className="col-lg-4" key={item.estate_id}>
                    <a  href={`/estate/${item.estate_slug}`}  className="homelengo-categories">
                      <div className="listing-card">
                        <div className="image_card">
                          <img src={item.image} alt="" />
                        </div>
                        <div className="info_content">
                          <h4>{item.estate_name}</h4>
                          <p className="location">
                            <i className="icon icon-mapPin"></i> {suburbName}, {state.toLocaleUpperCase()}
                          </p>
                          <p className="mb-2 lot-count">{item.lot_count} lots available</p>
                          <div className="price">
                            <span className="price_data"><small>From</small>${item.lowest_price
    ? Number(item.lowest_price
).toLocaleString("en-IN")
    : "0"}</span>
                            <button className="btn-primary">
                              View Estate <i className="icon icon-arr-r"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
            ))}
            </div>
                  {/* Button */}
                  <div className="col-lg-12">
                    <button className="all-listing-button">
                      View All Estates <i className="icon icon-arr-r"></i>
                    </button>
                  </div>


                </div>
                 
                    </>
                  )}
                <hr></hr>

                <div className="row">
                  |{}
                  <div className="col-lg-12">
                    <h3 className="title text-start">
                      House and Land Listings in  {suburbName} {state.toLocaleUpperCase()}
                    </h3>
                  </div>

                  {/* Card 1 */}
                  <div className="col-lg-4">
                    <a href="#" className="homelengo-categories">
                      <div className="listing-card">
                        <div className="image_card">
                          <img src="https://www.landsales.com.au/wp-content/uploads/2025/11/3608-nagambie-goulburn-valley-victoria.jpg" alt="" />
                        </div>
                        <div className="info_content">
                          <h4>Lot 515/26 Gelbvieh Road</h4>
                          <p className="location">
                            <i className="icon icon-mapPin"></i> Ashfield, VIC
                          </p>
                            <ul className="meta-list">
                                <li className="item"><i className="icon icon-bed"></i> <span> 3 </span></li>
                                <li className="item"><i className="icon icon-bath"></i> <span> 2 </span></li>
                                <li className="item"><i className="icon icon-garage"></i> <span> 2 </span></li>
                                <li className="item"> <i className="icon icon-sqft"></i> <span> 256m² </span></li>
                              </ul>
                          <div className="price">
                            <span className="price_data">$900,000</span>
                            <button className="btn-primary">
                              View Details <i className="icon icon-arr-r"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>

              
               




                  {/* Button */}
                  <div className="col-lg-12">
                    <button className="all-listing-button">
                      View All House & Land <i className="icon icon-arr-r"></i>
                    </button>
                  </div>


                </div>
				<hr></hr>
                <div className="row">
                  <div className="col-lg-12">
                    <h3 className="title text-start">
                      Townhouse Listings in  {suburbName} {state.toLocaleUpperCase()}
                    </h3>
                  </div>

                  {/* Card 1 */}
                  <div className="col-lg-4">
                    <a href="#" className="homelengo-categories">
                      <div className="listing-card">
                        <div className="image_card">
                          <img src="https://www.landsales.com.au/wp-content/uploads/2025/11/3608-nagambie-goulburn-valley-victoria.jpg" alt="" />
                        </div>
                        <div className="info_content">
                          <h4>Lot 515/26 Gelbvieh Road</h4>
                          <p className="location">
                            <i className="icon icon-mapPin"></i> Ashfield, VIC
                          </p>
                            <ul className="meta-list">
                                <li className="item"><i className="icon icon-bed"></i> <span> 3 </span></li>
                                <li className="item"><i className="icon icon-bath"></i> <span> 2 </span></li>
                                <li className="item"><i className="icon icon-garage"></i> <span> 2 </span></li>
                                <li className="item"> <i className="icon icon-sqft"></i> <span> 256m² </span></li>
                              </ul>
                          <div className="price">
                            <span className="price_data">$900,000</span>
                            <button className="btn-primary">
                              View Details <i className="icon icon-arr-r"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>

                
 



                  {/* Button */}
                  <div className="col-lg-12">
                    <button className="all-listing-button">
                      View All Townhouse <i className="icon icon-arr-r"></i>
                    </button>
                  </div>


                </div>
              </div>

              {/* Sidebar */}
              <div className="col-lg-3">
                <div className="side-sticky-img">
                  <img src="/images/sidebar-image-03.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>
      </>
)}
	  {/* Featured Estates */}
    
      <section className="flat-section slider_new flat-categories-1 arrow_shadow bg_color_2">
        <div className="container">
          <div className="box-title style-1 wow fadeInUp">
            <h3 className="title">
              Browse Land for Sale Near  {suburbName}  
            </h3>

            <div className="row">
              {/* Card 1 */}
              <div className="col-lg-3">
                <a href="#" className="homelengo-categories">
                  <div className="listing-card">
                    <div className="image_card">
                      <img src="https://www.landsales.com.au/wp-content/uploads/2025/11/3608-nagambie-goulburn-valley-victoria.jpg" alt="" />
                    </div>
                    <div className="info_content">
                      <h4>Ashfield 2131</h4>
                      {/* <p className="location">
                        <i className="icon icon-mapPin"></i> Cooranbong, VIC
                      </p> */}
                      <p className="mb-2 lot-count">36 lots available</p>
                      <div className="price">
                        <span className="price_data"><small>From</small>$900,000</span>
                        <button className="btn-primary">
                          View Details <i className="icon icon-arr-r"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
  
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

