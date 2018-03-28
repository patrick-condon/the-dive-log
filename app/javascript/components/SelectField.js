import React from 'react';

const SelectField = props => {
  let diveSites = props.options.map(site =>{
    return (
      <option key={site.id} value={site.id}>{site.name}</option>
    );
  })

  return (
    <div className="form-group row">
      <label className="col-3">{props.label}</label>
        <div className="col-9">
          <select name={props.name}
            value={props.selectedOption}
            onChange={props.handlerFunction}
            className="form-control">
            <option value=""></option>
            {diveSites}
          </select>
        </div>
    </div>
  );
}

export default SelectField;
