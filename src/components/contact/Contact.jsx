import './Contact.css';

const Contact = () => {
    return (
        <div className='contact' id='contact'>
            <div className='contact-description'>
                <h1>Contact <span>Me</span></h1>
                <p>Have a project in mind or need a reliable developer?<br />
                    Let's build something great together — feel free to reach out!</p>
            </div>
            <div className='contact-content'>
                <div className='contact-address'>
                    <p><span>Address_</span> Street No. 01, Sector: I-8/1, Islamabad</p>
                    <p><span>Phone_</span> +92-310-5476796</p>
                    <p><span>E mail_</span> muhammadehtishamraza15@gmail.com</p>
                    <p><span>Github_</span> www.github.com/MuhammadEhtishamRaza</p>
                </div>
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