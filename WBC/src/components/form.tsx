import React, { useState, useEffect } from "react";
import "./form.css"

interface FormProps {
    title: string;
    description: string;
}

interface Address {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
}

const Form: React.FC<FormProps> = ({ title, description }) => {
    const [company, setCompany] = useState<string>("");
    const [companyAddr, setCompanyAddr] = useState<Address | undefined>(undefined);
    const [complaintType, setComplaintType] = useState("Undefined");
    const [complaint, setComplaint] = useState<string>("");

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setCompanyAddr(prevAddr => ({
            ...prevAddr,
            [name]: value
        } as Address));
    };

    const handleComplaintTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        setComplaintType(value);
    };

    return (
        <div className="formContainer">
            <h1>{title}</h1>
            <p>{description}</p>
            <div>
                <label>Company:</label>
                <input 
                    type="text" 
                    value={company} 
                    onChange={(e) => setCompany(e.target.value)} 
                />
            </div>
            <div>
                <label>Street:</label>
                <input 
                    type="text" 
                    name="street" 
                    value={companyAddr?.street || ""} 
                    onChange={handleAddressChange} 
                />
            </div>
            <div>
                <label>City:</label>
                <input 
                    type="text" 
                    name="city" 
                    value={companyAddr?.city || ""} 
                    onChange={handleAddressChange} 
                />
            </div>
            <div>
                <label>State:</label>
                <input 
                    type="text" 
                    name="state" 
                    value={companyAddr?.state || ""} 
                    onChange={handleAddressChange} 
                />
            </div>
            <div>
                <label>Zip Code:</label>
                <input 
                    type="text" 
                    name="zipCode" 
                    value={companyAddr?.zipCode || ""} 
                    onChange={handleAddressChange} 
                />
            </div>
            <div>
                <label>Country:</label>
                <select 
                    name="country" 
                    value={companyAddr?.country || ""} 
                    onChange={handleAddressChange}
                >
                    <option value="">Select a country</option>
                    <option value="usa">United States</option>
                    <option value="canada">Canada</option>
                    <option value="uk">United Kingdom</option>
                    <option value="australia">Australia</option>
                </select>
                </div>
            <div>
                <label>Type of Complaint:</label>
                <select 
                    name="country" 
                    value={complaintType || ""} 
                    onChange={handleComplaintTypeChange}
                >
                    <option value="">Select a complaint type</option>
                    <option value="billing">Billing Issue</option>
                    <option value="service">Service Issue</option>
                    <option value="technical">Technical Issue</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <div>
                <label>Large Text:</label>
                <textarea 
                    value={complaint} 
                    onChange={(e) => setComplaint(e.target.value)} 
                />
            </div>
            <div>
                <button onClick={() => alert('Upload button clicked!')}>Upload</button>
            </div>
        </div>
    );
};

export default Form;