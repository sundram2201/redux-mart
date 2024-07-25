const Tab = ({ getProdCate }) => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div className='tab-container'>
        <input
          type='radio'
          name='tab'
          id='tab1'
          className='tab tab--1'
          value=''
          onClick={(e) => getProdCate(e.target.value)}
        />
        <label className='tab_label' htmlFor='tab1'>
          All
        </label>
        <input
          type='radio'
          name='tab'
          id='tab2'
          className='tab tab--2'
          value='men'
          onClick={(e) => getProdCate(e.target.value)}
        />
        <label className='tab_label' htmlFor='tab2'>
          Men
        </label>

        <input
          type='radio'
          name='tab'
          id='tab3'
          className='tab tab--3'
          value='women'
          onClick={(e) => getProdCate(e.target.value)}
        />
        <label className='tab_label' htmlFor='tab3'>
          Women
        </label>

        <input
          type='radio'
          name='tab'
          id='tab4'
          className='tab tab--4'
          value='kids'
          onClick={(e) => getProdCate(e.target.value)}
        />
        <label className='tab_label' htmlFor='tab4'>
          Kids
        </label>

        <div className='indicator'></div>
      </div>
    </div>
  );
};

export default Tab;
