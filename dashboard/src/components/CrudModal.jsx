import React, { useState } from "react";

const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(0,0,0,0.25)",
    backdropFilter: "blur(3px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    animation: "fadeInModal 0.3s",
    fontFamily: "'Inter', 'Nunito', 'Segoe UI', 'Roboto', 'Arial', sans-serif",
};
const modalStyle = {
    background: "#fff",
    borderRadius: "18px",
    padding: "2.5rem 2.5rem 2rem 2.5rem",
    minWidth: "340px",
    maxWidth: "95vw",
    boxShadow: "0 12px 48px rgba(74,78,105,0.18)",
    position: "relative",
    animation: "modalPop 0.3s",
    fontFamily: "'Inter', 'Nunito', 'Segoe UI', 'Roboto', 'Arial', sans-serif",
};
const closeBtnStyle = {
    position: "absolute",
    top: 18,
    right: 18,
    background: "none",
    border: "none",
    fontSize: 22,
    color: "#4a4e69",
    cursor: "pointer",
    fontWeight: 700,
    transition: "color 0.2s",
};
const headerStyle = {
    color: "#4a4e69",
    fontWeight: 700,
    fontSize: "1.5rem",
    marginBottom: "0.7rem",
    textAlign: "center",
    letterSpacing: 0.5,
};
const dividerStyle = {
    border: 0,
    borderTop: "2px solid #e0e1dd",
    margin: "0 0 1.5rem 0",
};
const fieldStyle = {
    display: "flex",
    flexDirection: "column",
    marginBottom: "1.2rem",
};
const labelStyle = {
    fontWeight: 500,
    marginBottom: "0.4rem",
    color: "#4a4e69",
};
const inputStyle = {
    padding: "0.7rem 0.9rem",
    border: "1.5px solid #9a8c98",
    borderRadius: "7px",
    fontSize: "1rem",
    transition: "border 0.2s, box-shadow 0.2s",
    outline: "none",
    background: "#f8f8fa",
    marginBottom: 0,
};
const inputFocusStyle = {
    border: "1.5px solid #4a4e69",
    boxShadow: "0 0 0 2px #c9ada7",
};
const buttonRow = {
    display: "flex",
    justifyContent: "flex-end",
    gap: "1rem",
    marginTop: "1.2rem",
};
const buttonStyle = {
    padding: "0.7rem 1.5rem",
    border: "none",
    borderRadius: "7px",
    fontWeight: 600,
    fontSize: "1.08rem",
    cursor: "pointer",
    transition: "background 0.2s, color 0.2s, box-shadow 0.2s",
    boxShadow: "0 2px 8px rgba(74,78,105,0.08)",
};
const cancelBtn = {
    ...buttonStyle,
    background: "#e0e1dd",
    color: "#4a4e69",
};
const saveBtn = {
    ...buttonStyle,
    background: "linear-gradient(90deg, #a18cd1 0%, #4a4e69 100%)",
    color: "#fff",
    boxShadow: "0 2px 8px rgba(74,78,105,0.10)",
};
const spinnerStyle = {
    width: 18,
    height: 18,
    border: "3px solid #fff",
    borderTop: "3px solid #9a8c98",
    borderRadius: "50%",
    display: "inline-block",
    animation: "spin 0.7s linear infinite",
    marginRight: 8,
    verticalAlign: "middle",
};

// Add keyframes for fadeIn, modalPop, and spin
const styleSheet = document.createElement("style");
styleSheet.innerHTML = `
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes modalPop { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
@keyframes spin { 100% { transform: rotate(360deg); } }
`;
document.head.appendChild(styleSheet);

// Add fadeInModal animation
if (!document.getElementById('fadeInModalStyle')) {
    const styleSheet = document.createElement("style");
    styleSheet.id = 'fadeInModalStyle';
    styleSheet.innerHTML = `
    @keyframes fadeInModal { from { opacity: 0; } to { opacity: 1; } }
  `;
    document.head.appendChild(styleSheet);
}

const CrudModal = ({ title, fields, initialValues = {}, onSubmit, onClose, isSubmitting }) => {
    const [form, setForm] = useState(initialValues);
    const [focus, setFocus] = useState({});

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "file" ? files[0] : value,
        }));
    };

    const handleFocus = (e) => setFocus((prev) => ({ ...prev, [e.target.name]: true }));
    const handleBlur = (e) => setFocus((prev) => ({ ...prev, [e.target.name]: false }));

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form);
    };

    return (
        <div style={overlayStyle} onClick={onClose}>
            <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
                <button style={closeBtnStyle} onClick={onClose} title="Close">×</button>
                <div style={headerStyle}>{title}</div>
                <hr style={dividerStyle} />
                <form onSubmit={handleSubmit}>
                    {fields.map((field) => (
                        <div key={field.name} style={fieldStyle}>
                            <label style={labelStyle}>{field.label}</label>
                            {field.type === "file" ? (
                                <input
                                    type="file"
                                    name={field.name}
                                    accept={field.accept || "*/*"}
                                    onChange={handleChange}
                                    style={inputStyle}
                                />
                            ) : field.type === "textarea" || field.name.toLowerCase().includes("description") ? (
                                <textarea
                                    style={{
                                        ...inputStyle,
                                        minHeight: 80,
                                        resize: 'vertical',
                                        ...(focus[field.name] ? inputFocusStyle : {}),
                                    }}
                                    name={field.name}
                                    value={form[field.name] || ""}
                                    onChange={handleChange}
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                    required={field.required}
                                />
                            ) : (
                                <input
                                    style={{
                                        ...inputStyle,
                                        ...(focus[field.name] ? inputFocusStyle : {}),
                                    }}
                                    type={field.type || "text"}
                                    name={field.name}
                                    value={form[field.name] || ""}
                                    onChange={handleChange}
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                    required={field.required}
                                />
                            )}
                        </div>
                    ))}
                    <div style={buttonRow}>
                        <button
                            type="button"
                            style={cancelBtn}
                            onClick={onClose}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            style={saveBtn}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? <span style={spinnerStyle}></span> : null}
                            {isSubmitting ? "Saving..." : "Save"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CrudModal; 