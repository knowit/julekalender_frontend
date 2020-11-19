import React from 'react';
import './Door.css';

import { Link, useParams } from "react-router-dom";
import ReactMarkdown from 'react-markdown';
import Light from './Light';
import { ReactComponent as Border } from './svg/mistletoeborder.svg';



const Door = () => {
    let { id } = useParams()

    const markdown = `# Heading  
    Bacon ipsum dolor amet salami picanha swine bacon pork chop frankfurter, meatloaf biltong filet mignon shoulder. Jerky flank kielbasa tenderloin venison andouille rump sirloin pig alcatra. Jerky turducken tongue, flank pig cupim pancetta sausage shoulder filet mignon hamburger chislic burgdoggen t-bone pork loin. Tongue frankfurter biltong short loin jerky shank salami, chislic beef corned beef jowl doner.
    
    Tongue alcatra meatball, jerky short ribs flank corned beef capicola. Pancetta filet mignon ground round, ham hock landjaeger doner meatloaf brisket alcatra meatball t-bone. Salami chislic porchetta capicola. Leberkas cow beef filet mignon corned beef, kielbasa burgdoggen buffalo sausage ground round drumstick beef ribs jerky. Doner beef bacon hamburger, porchetta frankfurter tail tenderloin shoulder pork. Swine turkey biltong kielbasa ball tip. Hamburger short loin kielbasa, cow biltong sirloin prosciutto tri-tip brisket pork belly.
    
    Tongue alcatra meatball, jerky short ribs flank corned beef capicola. Pancetta filet mignon ground round, ham hock landjaeger doner meatloaf brisket alcatra meatball t-bone. Salami chislic porchetta capicola. Leberkas cow beef filet mignon corned beef, kielbasa burgdoggen buffalo sausage ground round drumstick beef ribs jerky. Doner beef bacon hamburger, porchetta frankfurter tail tenderloin shoulder pork. Swine turkey biltong kielbasa ball tip. Hamburger short loin kielbasa, cow biltong sirloin prosciutto tri-tip brisket pork belly.
    
    Tongue alcatra meatball, jerky short ribs flank corned beef capicola. Pancetta filet mignon ground round, ham hock landjaeger doner meatloaf brisket alcatra meatball t-bone. Salami chislic porchetta capicola. Leberkas cow beef filet mignon corned beef, kielbasa burgdoggen buffalo sausage ground round drumstick beef ribs jerky. Doner beef bacon hamburger, porchetta frankfurter tail tenderloin shoulder pork. Swine turkey biltong kielbasa ball tip. Hamburger short loin kielbasa, cow biltong sirloin prosciutto tri-tip brisket pork belly.`

    return <main className="DoorWrapper">
        <Light nr={id} />
        <div className="BorderWrapper">
            <Border className="Border" />
        </div>
        <div className="Door">
            <Link className="BackButton" to="/">&larr; Tilbake til lukene</Link>

            <ReactMarkdown>{markdown}</ReactMarkdown>
            <form>
                <input placeholder="Ditt svar:" />
                <input type="submit" value="Send inn svar" />
            </form>
        </div></main>;
}


export default Door;