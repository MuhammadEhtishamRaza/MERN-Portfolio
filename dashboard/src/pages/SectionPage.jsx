import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CrudModal from "../components/CrudModal";

const API_BASE = "http://localhost:3000/api"; // Change if your backend runs elsewhere

const sectionConfig = {
    about: { endpoints: ["/aboutsection/about"] },
    contact: { endpoints: ["/contactsection/contact", "/contactform/form"] },
    experience: { endpoints: ["/experiencesection1/experience", "/experiencesection2/description"] },
    hero: { endpoints: ["/herosection/hero"] },
    portfolio: { endpoints: ["/portfoliosection1/portfolio", "/portfoliosection2/description"] },
    service: { endpoints: ["/servicesection1/service", "/servicesection2/description"] },
};

function getAllKeys(data) {
    const keys = new Set();
    data.forEach(item => {
        Object.keys(item).forEach(key => keys.add(key));
    });
    return Array.from(keys);
}

const tableStyles = {
    width: '100%',
    borderCollapse: 'separate',
    borderSpacing: 0,
    boxShadow: '0 4px 24px rgba(74,78,105,0.10)',
    background: '#fff',
    borderRadius: '14px',
    overflow: 'hidden',
    margin: '1.5rem 0',
    animation: 'fadeInTable 0.5s',
};
const thStyles = {
    border: '2px solid #4a4e69',
    padding: '14px 12px',
    background: '#4a4e69',
    color: '#fff',
    fontWeight: 700,
    fontSize: '1.08rem',
    textAlign: 'left',
    textTransform: 'capitalize',
    position: 'sticky',
    top: 0,
    zIndex: 1,
    letterSpacing: '0.5px',
};
const tdStyles = {
    border: '1.5px solid #e0c3fc',
    padding: '12px',
    fontSize: '1rem',
    color: '#22223b',
    background: '#f8f8fa',
    wordBreak: 'break-word',
    transition: 'background 0.2s',
};
const zebraStyles = {
    background: '#f3e8ff',
};
const rowHover = {
    transition: 'background 0.2s',
    cursor: 'pointer',
};

// Add fadeInTable animation
if (!document.getElementById('fadeInTableStyle')) {
    const styleSheet = document.createElement("style");
    styleSheet.id = 'fadeInTableStyle';
    styleSheet.innerHTML = `
        @keyframes fadeInTable { from { opacity: 0; transform: translateY(16px);} to { opacity: 1; transform: none; } }
    `;
    document.head.appendChild(styleSheet);
}

// Map dataset index to field configs for forms (customize as needed)
const datasetFields = {
    about: [
        [
            { name: "description1", label: "Description 1", required: true },
            { name: "description2", label: "Description 2", required: true },
            { name: "image", label: "Image", type: "file", required: true, accept: "image/*" },
        ],
    ],
    contact: [
        [
            { name: "address", label: "Address", required: true },
            { name: "phone", label: "Phone", required: true },
            { name: "email", label: "Email", required: true },
            { name: "github", label: "GitHub", required: true },
        ],
        [
            { name: "name", label: "Name", required: true },
            { name: "email", label: "Email", required: true },
            { name: "message", label: "Message", required: true },
        ],
    ],
    experience: [
        [
            { name: "duration", label: "Duration", required: true },
            { name: "position", label: "Position", required: true },
            { name: "company", label: "Company", required: true },
            { name: "description", label: "Description", required: true },
        ],
        [
            { name: "description", label: "Description", required: true },
        ],
    ],
    hero: [
        [
            { name: "title", label: "Title", required: true },
            { name: "description", label: "Description", required: true },
            { name: "image", label: "Image", type: "file", required: true, accept: "image/*" },
        ],
    ],
    portfolio: [
        [
            { name: "image", label: "Image", type: "file", required: true, accept: "image/*" },
        ],
        [
            { name: "description", label: "Description", required: true },
        ],
    ],
    service: [
        [
            { name: "title", label: "Title", required: true },
            { name: "image", label: "Image", type: "file", required: true, accept: "image/*" },
            { name: "description", label: "Description", required: true },
        ],
        [
            { name: "description", label: "Description", required: true },
        ],
    ],
};

const DeleteDialog = ({ open, onCancel, onConfirm }) => {
    if (!open) return null;
    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
            background: 'rgba(0,0,0,0.18)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: "'Inter', 'Nunito', 'Segoe UI', 'Roboto', 'Arial', sans-serif"
        }}>
            <div style={{
                background: '#fff', borderRadius: 14, boxShadow: '0 8px 32px rgba(74,78,105,0.18)',
                padding: '2rem 2.5rem', minWidth: 320, maxWidth: '90vw', textAlign: 'center',
                animation: 'fadeInModal 0.3s'
            }}>
                <div style={{ fontWeight: 700, fontSize: '1.2rem', color: '#c9184a', marginBottom: 18 }}>Are you sure you want to delete this item?</div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 18 }}>
                    <button
                        onClick={onCancel}
                        style={{
                            background: '#e0e1dd', color: '#4a4e69', border: 'none', borderRadius: 6, padding: '8px 22px', fontWeight: 600, fontSize: '1rem', cursor: 'pointer', boxShadow: '0 2px 8px rgba(74,78,105,0.10)', transition: 'background 0.2s',
                        }}
                    >Cancel</button>
                    <button
                        onClick={onConfirm}
                        style={{
                            background: 'linear-gradient(90deg, #a18cd1 0%, #c9184a 100%)', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 22px', fontWeight: 600, fontSize: '1rem', cursor: 'pointer', boxShadow: '0 2px 8px rgba(74,78,105,0.10)', transition: 'background 0.2s',
                        }}
                    >Delete</button>
                </div>
            </div>
        </div>
    );
};

const SectionPage = () => {
    const { section } = useParams();
    const [dataSets, setDataSets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [hoveredRow, setHoveredRow] = useState({});
    const [modal, setModal] = useState({ open: false, type: null, datasetIdx: 0, initial: {}, rowId: null });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState({ open: false, datasetIdx: null, row: null });

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const config = sectionConfig[section];
                if (!config) throw new Error("Invalid section");
                const results = await Promise.all(
                    config.endpoints.map(endpoint =>
                        axios.get(`${API_BASE}${endpoint}`)
                    )
                );
                setDataSets(results.map(res => Array.isArray(res.data) ? res.data : [res.data]));
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [section]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;

    const refreshData = async () => {
        setLoading(true);
        setError(null);
        try {
            const config = sectionConfig[section];
            if (!config) throw new Error("Invalid section");
            const results = await Promise.all(
                config.endpoints.map(endpoint =>
                    axios.get(`${API_BASE}${endpoint}`)
                )
            );
            setDataSets(results.map(res => Array.isArray(res.data) ? res.data : [res.data]));
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = (datasetIdx) => {
        setModal({ open: true, type: "create", datasetIdx, initial: {}, rowId: null });
    };
    const handleEdit = (datasetIdx, row) => {
        setModal({ open: true, type: "edit", datasetIdx, initial: row, rowId: row._id });
    };
    const handleDelete = (datasetIdx, row) => {
        setDeleteDialog({ open: true, datasetIdx, row });
    };

    const confirmDelete = async () => {
        setIsSubmitting(true);
        const { datasetIdx, row } = deleteDialog;
        try {
            const endpoint = sectionConfig[section].endpoints[datasetIdx];
            await axios.delete(`${API_BASE}${endpoint}/${row._id}`);
            await refreshData();
        } catch (err) {
            alert("Delete failed: " + err.message);
        } finally {
            setIsSubmitting(false);
            setDeleteDialog({ open: false, datasetIdx: null, row: null });
        }
    };

    const handleModalSubmit = async (form) => {
        setIsSubmitting(true);
        const { type, datasetIdx, rowId } = modal;
        const endpoint = sectionConfig[section].endpoints[datasetIdx];
        const fields = (datasetFields[section] && datasetFields[section][datasetIdx]) || [];
        let data, headers;
        let url = `${API_BASE}${endpoint}`;
        let method = type === "edit" ? "put" : "post";
        if (type === "edit") url += `/${rowId}`;
        // Check if any field is a file
        if (fields.some(f => f.type === "file")) {
            data = new FormData();
            fields.forEach(f => {
                if (form[f.name]) data.append(f.name, form[f.name]);
            });
            headers = { "Content-Type": "multipart/form-data" };
        } else {
            data = {};
            fields.forEach(f => {
                if (form[f.name]) data[f.name] = form[f.name];
            });
            headers = {};
        }
        try {
            await axios({ method, url, data, headers });
            setModal({ open: false, type: null, datasetIdx: 0, initial: {}, rowId: null });
            await refreshData();
        } catch (err) {
            alert("Save failed: " + (err.response?.data?.error || err.message));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <h2 style={{ marginBottom: '1.5rem', textTransform: 'capitalize', color: '#4a4e69', fontWeight: 700, fontSize: '2rem' }}> {section} Section</h2>
            {dataSets.map((data, idx) => {
                const keys = getAllKeys(data);
                const fields = (datasetFields[section] && datasetFields[section][idx]) || keys.map(k => ({ name: k, label: k }));
                return (
                    <div key={idx} style={{ marginBottom: "2.5rem" }}>
                        {dataSets.length > 1 && (
                            <h3 style={{ marginBottom: '0.5rem', color: '#22223b', fontWeight: 600 }}>Data Set {idx + 1}</h3>
                        )}
                        <button
                            style={{ marginBottom: 12, background: '#4a4e69', color: '#fff', border: 'none', borderRadius: 5, padding: '8px 18px', fontWeight: 600, cursor: 'pointer' }}
                            onClick={() => handleCreate(idx)}
                            disabled={isSubmitting}
                        >
                            + Create
                        </button>
                        {data.length === 0 ? (
                            <div>No data found.</div>
                        ) : (
                            <div style={{ overflowX: 'auto', borderRadius: '8px' }}>
                                <table style={tableStyles}>
                                    <thead>
                                        <tr>
                                            {keys.map((key) => (
                                                <th key={key} style={thStyles}>{key}</th>
                                            ))}
                                            <th style={thStyles}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((item, idx2) => (
                                            <tr
                                                key={item._id || idx2}
                                                style={{
                                                    ...rowHover,
                                                    ...(idx2 % 2 === 1 ? zebraStyles : {}),
                                                    background: hoveredRow[idx + '-' + idx2] ? '#c9ada7' : (idx2 % 2 === 1 ? zebraStyles.background : tdStyles.background)
                                                }}
                                                onMouseEnter={() => setHoveredRow({ ...hoveredRow, [idx + '-' + idx2]: true })}
                                                onMouseLeave={() => setHoveredRow({ ...hoveredRow, [idx + '-' + idx2]: false })}
                                            >
                                                {keys.map((key, i) => (
                                                    <td key={i} style={tdStyles}>{item[key] !== undefined ? String(item[key]) : ""}</td>
                                                ))}
                                                <td style={tdStyles}>
                                                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
                                                        {!(section === "contact" && idx === 1) && (
                                                            <button
                                                                style={{ background: '#9a8c98', color: '#fff', border: 'none', borderRadius: 4, padding: '4px 12px', fontWeight: 500, cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }}
                                                                onClick={() => handleEdit(idx, item)}
                                                                disabled={isSubmitting}
                                                                title="Edit"
                                                            >
                                                                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-2.828 0L5.232 12.232a2 2 0 010-2.828L9 13z" /></svg>
                                                            </button>
                                                        )}
                                                        <button
                                                            style={{ background: '#c9184a', color: '#fff', border: 'none', borderRadius: 4, padding: '4px 12px', fontWeight: 500, cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }}
                                                            onClick={() => handleDelete(idx, item)}
                                                            disabled={isSubmitting}
                                                            title="Delete"
                                                        >
                                                            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                );
            })}
            {modal.open && (
                <CrudModal
                    title={modal.type === "create" ? "Create" : "Edit"}
                    fields={(datasetFields[section] && datasetFields[section][modal.datasetIdx]) || []}
                    initialValues={modal.initial}
                    onSubmit={handleModalSubmit}
                    onClose={() => setModal({ open: false, type: null, datasetIdx: 0, initial: {}, rowId: null })}
                    isSubmitting={isSubmitting}
                />
            )}
            <DeleteDialog
                open={deleteDialog.open}
                onCancel={() => setDeleteDialog({ open: false, datasetIdx: null, row: null })}
                onConfirm={confirmDelete}
            />
        </div>
    );
};

export default SectionPage; 