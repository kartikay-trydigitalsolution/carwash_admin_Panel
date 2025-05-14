import React from "react";

const DataTableHeaderContainer = ({
  onButtonClick,
  onAddButtonClick,
  title,
  buttonTitle,
}) => {
  const handleClick = () => {
    const message = "Hello from the child!";
    onButtonClick(message);
  };
  const handleModelClick = () => {
    onAddButtonClick({ type: "Dashboard" });
  };

  return (
    <div className="w-100 fullscreen-container px-4">
      <div className="d-flex justify-content-between ">
        <div className="datatable_title">{title}</div>
        <div className="d-flex">
          <div className="search-box mr-2">
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
          <button className="add-button" onClick={handleModelClick}>
            {buttonTitle}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataTableHeaderContainer;
