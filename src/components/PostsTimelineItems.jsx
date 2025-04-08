import SchoolIcon from '@mui/icons-material/School';
import LaptopIcon from '@mui/icons-material/Laptop';
import { FaExchangeAlt } from 'react-icons/fa';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PhonelinkIcon from '@mui/icons-material/Phonelink';
import WorkIcon from '@mui/icons-material/Work';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import { Box } from '@mui/material';

export const timelineItems = {
    "2022-04A": {
        date: "Apr 2022",
        icon: <SchoolIcon />,
        title: {"en":"Admitted to Tokyo Institute of Technology (Tokyo Tech)", "ja":"東京工業大学 入学"},
        subtitle: {"en":"Dept. of Computer Science", "ja":"情報理工学院"},
        tag:["education"],
    },
    "2024-06S": {
        date: "Jun - Aug 2024",
        icon: <FlightTakeoffIcon />,
        title: {"en":"Studied computer science at University of California, Berkeley (UC Berkeley)🇺🇸", "ja":"🇺🇸カリフォルニア大学バークレー校(UC Berkeley)留学"},
        subtitle: {"en":"Summer Session" , "ja":"Summer Session"},
        tag:["education"],
        detail:<Box> 
            I applied for an 8-week summer session at the University of California, Berkeley, where I took the following courses:
            <ul>
                <li><a href="https://inst.eecs.berkeley.edu/~cs188/su24/" target="_blank" rel="noopener noreferrer">CS188 Introduction to Artificial Intelligence</a> (GPA 4.0/4.0)</li>
                <li>STAT155 Game Theory (GPA 3.7/4.0)</li>
            </ul>
            In my department, very few students choose to study abroad, and no one had ever participated in this program before. 
            However, I believed that gaining a global perspective and studying in a diverse cultural environment were essential. 
            Despite the limited information available, I independently handled the visa application, accommodation arrangements, and scholarship applications.
            During my time there, I was in an environment with very few Japanese students. 
            Nevertheless, I was able to interact with many students from different backgrounds, which helped me develop initiative and communication skills from a global perspective.
            <br />
            Here are the details: 
            <a href="https://www.titech.ac.jp/students/abroad/experiences/70001" target="_blank" rel="noopener noreferrer">Tokyo Institute of Technology Study Abroad Experience Report</a>.
        </Box>,
            
    },
    "2024-10C": {
        date: "Oct - Oct 2024",
        icon: <LaptopIcon />,
        title: {"en":"Create a web service that generates an iCloud calendar from a syllabus URL.", "ja":"シラバスURLからiCloudカレンダーを生成するWebサービスを作成"},
        subtitle: {"en":"Python, Gradio", "ja":"Python, Gradio"},
        tag:["projects"],
        detail:<Box>
            I developed a web application called Curricuram, which allows users to create an iCloud calendar from syllabus URLs published on the Institute of Science Tokyo OCW website.
            Specifically, I used Python for web scraping to extract course information and generate an .ics file that can be imported into a calendar. 
            Additionally, I improved the application by integrating Gradio and Hugging Face, enabling users to run it directly on the web.
            <br />
            Here are the details:
            <a href="https://huggingface.co/spaces/Tat2too/Curricuram" target="_blank" rel="noopener noreferrer">Curricuram</a>.
        </Box>,

    },
    "2024-10T": {
        date: "Oct 2024",
        icon: <FaExchangeAlt />,
        title: {"en":"Tokyo Institute of Technology (Tokyo Tech) merged to become Institute of Science Tokyo (Science Tokyo)", "ja":"東京工業大学が大学統合により東京科学大学へ"},
        subtitle: {"en":null, "ja":null},
        tag:["education"],
    },
    "2024-11P": {
        date: "Nov 2024 -",
        icon: <MenuBookIcon />,
        title: {"en":"Published an article online that explains natural language processing (NLP).", "ja":"自然言語処理(NLP)の解説記事をNoteに投稿"},
        subtitle: {"en":"Publishing on Note", "ja":null},
        tag:["projects"],
        detail:<Box>
            I am sharing my self-study of natural language processing on Note, breaking down the basics so that even high school students can understand.
            During my study abroad at UC Berkeley, 
            I had the opportunity to hear from a researcher in natural language processing. 
            I learned that the "AI" that seems like magic, such as ChatGPT, is actually built upon the knowledge 
            I have accumulated so far. Since then, I have developed a keen interest in natural language processing and have been 
            documenting my learning journey through Note.
            <br />
            For more details, check out my post here: 
            <a href="https://note.com/tat5453/n/n3f22d032c25a" target="_blank" rel="noopener noreferrer">Natural Language Processing (NLP) Study</a>.
        </Box>,
    },
    "2024-12C": {
        date: "Dec 2024 - Feb 2025",
        icon: <PhonelinkIcon />,
        title: {"en":"Created a Flutter app called fuguru (iOS, Android, Web) using GCP to filter out already-read content from articles.", "ja":"GCPを使用して、記事から既に読んだことのある内容を除外するFlutterアプリfuguru(iOS, Android, Web)を作成"},
        subtitle: {"en":"Google Cloud Platform (Gemini on Vertex AI, Text Embedding), Firebase, Flutter","ja":"Google Cloud Platform (Gemini on Vertex AI, Text Embedding), Firebase, Flutter"},
        tag:["projects"],
        detail:<Box>

            I developed a web, iOS, and Android version of a service that removes previously read content from documents using Google Cloud Platform (GCP), Firebase, and Flutter.
            I was primarily responsible for GCP and Firebase processing. In order to process the material cost-effectively and fast, I introduced firebase's vector search to filter the process by vector-to-vector similarity.
            I also implemented efficient parallel processing by converting the materials to markdown and dividing them according to their structure for parallel processing, allowing processes such as Gemini, which are generally time-consuming, to be parallelized and made faster.
            <br />
            For more details, check out the article here:
            <a href="https://zenn.dev/yay1/articles/4c2615d147089c" target="_blank" rel="noopener noreferrer">Filter out already-read content from articles(Fuguru)</a>.
        </Box>,

    },
    "2025-2I": {
        date: "Feb 2025 - Now",
        icon: < WorkIcon/>,
        title: {"en":"Internship at Sky Co., LTD.(Sky株式会社)", "ja":"インターンシップ@Sky株式会社"},
        subtitle: {"en":"Developing a web service.", "ja":"Web開発"},
        tag:["work"],
        detail:<Box>
            The company website here:
            <a href="https://www.skygroup.jp/" target="_blank" rel="noopener noreferrer">Sky Co., LTD.</a>.
        </Box>,
    },
    "2025-3C": {
        date: "Mar - Mar 2025",
        icon: <LaptopIcon />,
        title: {"en":"Created this website using React and Material-UI.", "ja":"ReactとMaterial-UIを使用して自己紹介ウェブサイトを作成"},
        subtitle: {"en":"React, Material-UI", "ja":"React, Material-UI"},
        tag:["projects"],
        detail:<Box>
            I created this website to introduce myself and my achievements. 
            I used React and Material-UI to design the layout and components. 
            I also used GitHub Pages to host the site. 
            I wanted to create a website that would allow me to share my experiences and achievements with others in a visually appealing way.
            <br />
            For more details, check out the GitHub repository here: 
            <a href="https://github.com/Tatsuya736482/myprofile.git" target="_blank" rel="noopener noreferrer">GitHub repository</a>.
        </Box>,
    },
    "2025-3D": {
        date: "Mar - now",
        icon: <LaptopIcon />,
        title: {"en":"I have built a website for a student organization using Next.js and Firebase.", "ja":"Next.jsとFirebaseを使用して、留学サポート団体のウェブサイトを構築"},
        subtitle: {"en":"Next.js, Firebase,Auth.js,Supabase(For file storage)", "ja":"Next.js, Firebase,Auth.js,Supabase(For file storage)"},
        tag:["projects"],
        detail:<Box>
             "I have developed a dynamic website for a student organization using Next.js and Firebase, focusing on efficient performance and scalability. 
             <br />
             The site utilizes Incremental Static Regeneration (ISR) on Vercel, ensuring fast page loads and optimal SEO while maintaining the ability to update content without rebuilding the entire site. 
             <br />
             I prioritized free hosting by leveraging Vercel’s free tier for deployment. 
                <br />
             
             To secure access to article management, I implemented OAuth using Google Accounts via Auth.js, allowing only authorized members to manage and post content. 
                <br />
             This project highlights my ability to build efficient, user-friendly platforms with secure, role-based access control and my commitment to cost-effective, high-performance web solutions.
            <a href="https://www.flap-sciencetokyo.com" target="_blank" rel="noopener noreferrer">https://www.flap-sciencetokyo.com</a>.
        </Box>,
    },
    "now": {
        date: "Apr 2022 - Now",
        icon: <SchoolIcon />,
        title: {"en":"Studying at Institute of Science Tokyo (Science Tokyo)", "ja":"東京科学大学 在学中"},
        subtitle: {"en":null, "ja":"情報理工学院 情報工学科"},
        link: null,
        tag:["education"],
    },
};