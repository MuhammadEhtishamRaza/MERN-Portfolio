import { useActionState, useEffect, useState } from 'react';
import './Contact.css';
import Swal from "sweetalert2"
// import { fetchContact } from '../../api/project';

const Contact = () => {
    const [contact, setContact] = useState([])

    const fetchContact = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/contactsection/contact")
            const result = await response.json()
            // console.log("Contact: ", result)
            return result
        } catch (error) {
            console.error("Error while fetching from Contact Section API: ", error.message)
        }
    }

    useEffect(() => {
        fetchContact().then((data) => setContact(data))
    }, [])

    const submitContact = async (previousState, formData) => {
        try {
            // console.log(formData)
            const data = {
                name: formData.get("name"),
                email: formData.get("email"),
                message: formData.get("message"),
            };
            const response = await fetch("http://localhost:3000/api/contactform/form", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-type": "application/json"
                }
            })
            const result = await response.json()
            // console.log(result)

            if (result["message"] == "Message Received") {
                Swal.fire({
                    title: "Success",
                    text: result?.message || "Form submitted successfully!",
                    icon: "success",
                    timer: 500,
                })
            }

            return null
        } catch (error) {
            console.error("Error while submiting contact form", error.message)
            Swal.fire({
                title: "Error",
                text: "Something went wrong while submitting the form.",
                icon: "error",
                confirmButtonText: "OK"
            });
        }
    }

    const [error, submitAction, isPending] = useActionState(submitContact, null)


    return (
        <div className='contact' id='contact'>
            <div className='contact-description'>
                <h1>Contact <span>Me</span></h1>
                <p>Have a project in mind or need a reliable developer?<br />
                    Let's build something great together — feel free to reach out!</p>
            </div>
            <div className='contact-content'>
                {contact.map((item) => (
                    <div className='contact-address' key={item._id}>
                        <p><span>Address_</span> {item.address}</p>
                        <p><span>Phone_</span> {item.phone}</p>
                        <p><span>E mail_</span> {item.email}</p>
                        <p><span>Github_</span> {item.github}</p>
                    </div>
                ))}
                <div className='contact-info'>
                    <form action={submitAction}>
                        <div>
                            <input type="text" name="name" className="input-name" placeholder='Name' required />
                        </div>
                        <div>
                            <input type="email" name="email" className="input-name" placeholder='Email' required />
                        </div>
                        <div>
                            <textarea name="message" id="input-message" placeholder='Message' cols={"64"} rows={"8"} required />
                        </div>
                        {error && <p style={{ color: 'white' }}>Error occured</p>}
                        <div>
                            <input type="submit" value={isPending ? "Submitting" : "Contact Us"} />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Contact