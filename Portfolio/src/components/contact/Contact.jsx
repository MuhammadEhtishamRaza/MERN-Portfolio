import { useEffect, useState } from 'react';
import './Contact.css';
import { fetchContact } from '../../api/project';

const Contact = () => {
    const [contact, setContact] = useState([])
    useEffect(() => {
        fetchContact().then((data) => setContact(data))
    }, [])
    return (
        <div className='contact' id='contact'>
            <div className='contact-description'>
                <h1>Contact <span>Me</span></h1>
                <p>Have a project in mind or need a reliable developer?<br />
                    Let's build something great together — feel free to reach out!</p>
            </div>
            <div className='contact-content'>
                {contact.map((item) => (
                    <div className='contact-address' key={item.id}>
                        <p><span>Address_</span> {item.address}</p>
                        <p><span>Phone_</span> {item.phone}</p>
                        <p><span>E mail_</span> {item.email}</p>
                        <p><span>Github_</span> {item.github}</p>
                    </div>
                ))}
                <div className='contact-info'>
                    <form action="#">
                        <div>
                            <input type="text" name="name" id="input-name" placeholder='Name' />
                        </div>
                        <div>
                            <textarea name="message" id="input-message" placeholder='Message' cols={"64"} rows={"8"}></textarea>
                        </div>
                        <div>
                            <input type="submit" value="Contact us" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Contact