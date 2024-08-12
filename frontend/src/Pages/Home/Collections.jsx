import React from "react";
import AnimatedText from "../../components/Animations";
import col1 from "../../../public/col-1.jpg";
import col2 from "../../../public/col-2.jpg";
import col3 from "../../../public/col-3.jpg";

const Collections = ({ styles, isSMallScreen }) => {
  const textPartsCollections = [{ text: "Collections", style: styles.newArrivalsHeading }];

  const renderCollectionImages = () => (
    <div className='row justify-content-center'>
      <div className='col-md-4 d-flex p-0 flex-column justify-content-between'>
        {[col1, col2].map((col, i) => (
          <div key={i} className='flex-fill banner-box position-relative' style={styles.images}>
            <img src={col} className='coll-img' alt={`collection-${i}`} />
            <h1 className='position-absolute women-col-head'>{i === 0 ? "T-Shirts" : "Kids"}</h1>
            <div className='empty' style={styles.layer}></div>
          </div>
        ))}
      </div>
      <div className='col-md-5 banner-box position-relative right-coll' style={styles.images}>
        <img src={col3} className='coll-img' alt='right collection' />
        <h1 className='position-absolute men-col-head'>Men Hoodies</h1>
        <div className='empty' style={styles.layer}></div>
      </div>
    </div>
  );
  return (
    <div>
      <h1 className={isSMallScreen ? "text-center mb-3" : "text-start mb-5"}>
        <AnimatedText parts={textPartsCollections} />
      </h1>
      {renderCollectionImages()}
    </div>
  );
};

export default Collections;
