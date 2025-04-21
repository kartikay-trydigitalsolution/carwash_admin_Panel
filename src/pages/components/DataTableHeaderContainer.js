import React from "react";

const DataTableHeaderContainer = ({ onButtonClick, title, buttonTitle }) => {
  const handleClick = () => {
    const message = "Hello from the child!";
    onButtonClick(message);
  };

  return (
    <div className="w-100 fullscreen-container px-4">
      <div className="d-flex justify-content-between ">
        <div className="datatable_title">{title}</div>
        <div className="d-flex">
          <div class="search-box mr-2">
            <button className="search_icon">
              <i className="fa fa-search"></i>
            </button>
            <input
              className="datatable_input"
              onClick={handleClick}
              id="search-input"
              name="q"
              placeholder="Search..."
            />
          </div>
          <button class="add-button">{buttonTitle}</button>
        </div>
      </div>
    </div>
  );
};

export default DataTableHeaderContainer;
