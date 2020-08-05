
import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import  './styles.css';

function TeacherItem () {
    return (
        <article className="teacher-item">
            <header>
                <img src="https://pbs.twimg.com/profile_images/1278013120703799296/B44x2T3n_400x400.jpg" alt="Nome" />
                <div>
                    <strong>Angello</strong>
                    <span>Matemática</span>
                </div>
            </header>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a consectetur leo. Maecenas bibendum viverra justo non imperdiet.
                <br /><br />
                Vestibulum egestas, risus et dignissim aliquet, ex nulla sagittis augue, in facilisis lectus libero quis purus. Integer tincidunt congue semper. Aenean vestibulum massa non elit tempor laoreet.
            </p>
            <footer>
                <p>
                    Preço/hora
                    <strong>R$ 80,00</strong>
                </p>
                <button type="button">
                    <img src={whatsappIcon} alt="Whatsapp" />
                    Entrar em contato
                </button>
            </footer>
        </article>
    )
}

export default TeacherItem;