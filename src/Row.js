function Row({ label, id, readOnly, defaultValue, value, onChange }) {
  return (
    <div className="row my-2">
      <label htmlFor={id} className="col-sm-8 col-md-9 col-lg-8 col-xl-9 col-form-label">
        {label}
      </label>
      <div className="col-sm-4 col-md-3 col-lg-4 col-xl-3">
        <div className="input-group">
          <span className="input-group-text">$</span>
          <input
            type="number"
            className="form-control"
            id={id}
            defaultValue={defaultValue}
            value={value}
            onChange={onChange}
            readOnly={readOnly}
          />
        </div>
      </div>
    </div>
  );
};

export default Row;
