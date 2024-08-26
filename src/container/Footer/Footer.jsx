import { useState } from 'react'

import { images } from "../../constants"
import { AppWrap, MotionWrap } from "../../wrapper"
import { client } from '../../client'

import "./Footer.scss"

const Footer = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' })
    const [isFormSubmitted, setIsFormSubmitted] = useState(false)
    const [loading, setLoading] = useState(false)

    const { name, email, message } = formData

    const handleChangeInput = (e) => {
        const { name, value } = e.target

        setFormData({ ...formData, [name]: value })
    }

    const handleSumbit = () => {
        setLoading(true);

        const contact = {
            _type: 'contact',
            name: name,
            email: email,
            message: message
        };

        client.create(contact)
            .then(() => {
                setLoading(false);
                setIsFormSubmitted(true);
            })
            .catch((error) => {
                console.error("Failed to submit the form:", error);
                setLoading(false);
            });
    };

    return (
        <>
            <h2 className='head-text'>Take a coffee & chat with me</h2>

            <div className='app__footer-cards'>
                <div className='app__footer-card'>
                    <img src={images.email} alt="email" />
                    <a href="mailto:ayebaemianwasi70@gmail.com" className='p-text'>Ayebaemianwasi70@gmail.com</a>
                </div>
                <div className='app__footer-card'>
                    <img src={images.mobile} alt="mobile" />
                    <a href="tel: +234 815-113-438" className='p-text'>+234 815-113-438</a>
                </div>
            </div>

            {!isFormSubmitted
                ?
                <div className='app__footer-form app__flex'>
                    <div className='app__flex'>
                        <input
                            name='name'
                            type="text"
                            className='p-text'
                            placeholder='Your Name'
                            value={name}
                            onChange={handleChangeInput} />
                    </div>
                    <div className='app__flex'>
                        <input
                            name='email'
                            type="email"
                            className='p-text'
                            placeholder='Your Email'
                            value={email}
                            onChange={handleChangeInput} />
                    </div>
                    <div>
                        <textarea
                            className='p-text'
                            placeholder='Your Message'
                            value={message}
                            name='message'
                            onChange={handleChangeInput} />
                    </div>
                    <button
                        type='button'
                        className='p-text'
                        onClick={handleSumbit}>
                        {loading ? 'Sending' : 'Send Message'}
                    </button>
                </div>
                :
                <div>
                    <h3 className='head-text'>Thank you for getting in touch!</h3>
                </div>
            }

        </>
    )
}

export default AppWrap(
    MotionWrap(Footer, 'app__footer'),
    'contact',
    'app__whitebg'
)