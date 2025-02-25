import React from 'react';
import Box from '@mui/material/Box';
import { scroller } from 'react-scroll';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import ElementsDarkmode from './ElementsDarkmode';

export default function ElementsOutline({ lng = "en" }) {
    const scrollToSection = (section) => {
        scroller.scrollTo(section, {
            duration: 800,
            delay: 0,
            smooth: 'easeInOutQuart'
        });
    };

    const title = lng === "ja" ? "Shortcuts" : "Shortcuts";
    const timeline = lng === "ja" ? "⏳経歴" : "⏳Personal history";
    const skills = lng === "ja" ? "📚資格など" : "📚Skills";
    const description = lng === "ja" ? "各項目をクリックすると、詳細にジャンプします。" : "✔︎Click on the items to jump to the details.";
    const navigateLng = lng === "ja" ? "📖Read in English" : "📖日本語版はこちら";
    const navigateLngUrl = lng === "ja" ? `${process.env.PUBLIC_URL}/en` : `${process.env.PUBLIC_URL}/ja`;    
    const navigateDarkmode = lng === "ja" ? "🌙ダークモードに切り替える" : "🌙Dark Mode";


    return (
        <Box sx={{ p: 1, textAlign: 'center', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
            <h3><DirectionsRunIcon/>{title}</h3>
            <p>{description}</p>
                <li>
                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            scrollToSection('Timeline');
                        }}
                        style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}
                    >
                        <span style={{ textDecoration: "underline", textDecorationThickness: "0.1px" }}>
                            {timeline}
                        </span>
                    </a>
                </li>
                <li>
                    <a
                        href={navigateLngUrl}
                        onClick={(e) => {
                            e.preventDefault();
                            scrollToSection('Skills');
                        }}
                        style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}
                    >
                        <span style={{ textDecoration: "underline", textDecorationThickness: "0.5px" }}>
                            {skills}
                        </span>
                    
                    </a>
                </li>
                <li>
                    <a
                        href={navigateLngUrl}
                        style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}
                    >
                        <span style={{ textDecoration: "underline", textDecorationThickness: "0.5px" }}>
                            {navigateLng}
                        </span>

                    </a>
                </li>

            </ul>
           
        </Box>
    );
}