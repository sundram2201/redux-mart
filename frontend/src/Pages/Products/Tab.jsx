import React from "react";

// TabItem component for rendering individual tab
const TabItem = ({ id, value, label, onClick }) => (
  <>
    <input
      type='radio'
      name='tab'
      id={id}
      className={`tab tab--${id}`}
      value={value}
      onChange={() => onClick(value)}
      aria-checked={false}
    />
    <label className='tab_label' htmlFor={id}>
      {label}
    </label>
  </>
);

const Tab = ({ getProdCate }) => {
  // Define tabs data
  const tabs = [
    { id: "1", value: "", label: "All" },
    { id: "2", value: "men", label: "Men" },
    { id: "3", value: "women", label: "Women" },
    { id: "4", value: "kids", label: "Kids" },
  ];

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div className='tab-container'>
        {tabs.map(({ id, value, label }) => (
          <TabItem key={id} id={`${id}`} value={value} label={label} onClick={getProdCate} />
        ))}
        <div className='indicator'></div>
      </div>
    </div>
  );
};

export default Tab;
