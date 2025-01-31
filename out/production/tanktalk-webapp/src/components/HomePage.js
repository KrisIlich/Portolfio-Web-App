import React, { useEffect, useState, useRef } from 'react';
import '../assets/styles/Home.css';
import Header from './shared/Header';
import ChatBot from './ChatBot/ChatBot';
import MyFitnessPal from './MyFitnessPal/CalorieCounter';
import PlatformerGame from './PlatformerGame/PlatformerGame';
import SkillsGrid from './SkillsGrid/SkillsGrid';
import InquiryForm from './InquiryForm/InquiryForm';
import handleHomeClick from './shared/Header';
import { useNavigate, useLocation } from 'react-router-dom';
import { smoothScrollTo, smoothScrollToPosition } from './utils/scrollUtils';

const HomePage = () => {
  // Refs
  const heirloomContainerRef = useRef(null);
  const aiContainerRef = useRef(null);
  const nutritionContainerRef = useRef(null);
  const verticalWorldContainerRef = useRef(null);
  const aboutMeContainerRef = useRef(null);
  const projectsWrapperRef = useRef(null);
  const targetWorkSection = useRef(null);
  const formContainerRef = useRef(null);
  const botObserverRef = useRef(null);

  // Router
  const navigate = useNavigate();
  const location = useLocation();

  // State
  const [isVerticalWorldOpen, setIsVerticalWorldOpen] = useState(false);
  const [isFitnessPalOpen, setIsFitnessPalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isSubheaderVisible, setIsSubheaderVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [projectsClicked, setProjectsClicked] = useState(false);

  // Close subheader
  const closeSubheader = () => {
    setIsSubheaderVisible(false);
  };

  // Toggle subheader
  const toggleSubheader = () => {
    setIsSubheaderVisible((prev) => !prev);
  };

useEffect(() => {
  const botDetails = document.querySelector('.chat-bot-details');
  if (!botDetails) return;

  const handleChatbotScroll = () => {
    const rect = botDetails.getBoundingClientRect();
    const inViewport = rect.top < window.innerHeight && rect.bottom >= 0;

    if (inViewport) {
      botDetails.classList.add('visible');
    } else {
      botDetails.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', handleChatbotScroll);
  handleChatbotScroll();

  return () => {
    window.removeEventListener('scroll', handleChatbotScroll);
  };
}, []);

// Add a *second* effect for subheader scroll logic
useEffect(() => {
  const handleSubheaderScroll = () => {
    setIsScrolled(window.scrollY > 0);
  };

  window.addEventListener('scroll', handleSubheaderScroll);
  handleSubheaderScroll();

  return () => {
    window.removeEventListener('scroll', handleSubheaderScroll);
  };
}, []);

  // Rotating words
  const AnimatedWords = () => {
    const [index, setIndex] = useState(0);
    const words = [
      'full stack developer.',
      'life long learner.',
      'creative visionary.',
    ];

    useEffect(() => {
      const interval = setInterval(() => {
        setIndex((prev) => (prev + 1) % words.length);
      }, 2500);
      return () => clearInterval(interval);
    }, []);

    return (
      <div className="animated-words">
        {words.map((word, i) => (
          <span
            key={i}
            className={`word ${
              i === index
                ? 'visible'
                : i === (index - 1 + words.length) % words.length
                ? 'hidden'
                : ''
            }`}
          >
            {word}
          </span>
        ))}
      </div>
    );
  };

  // Smooth scroll to project ref
  const smoothScrollToRef = (ref) => {
    const element = ref?.current || document.querySelector('.heirloom-container');
    if (element) {
      const targetPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const viewportWidth = window.innerWidth;
      let offset = viewportWidth <= 820 ? -140 : -70;
      const startPosition = window.pageYOffset;
      const distance = targetPosition + offset - startPosition;
      const duration = 500;
      let startTime = null;

      const ease = (t, b, c, d) => {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t + b;
        t--;
        return (-c / 2) * (t * (t - 2) - 1) + b;
      };

      const animation = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
      };
      requestAnimationFrame(animation);
    } else {
      console.log('Heirloom element not found');
    }
  };

  // Smooth scroll for "View My Work"
  const scrollToTarget = () => {
    setProjectsClicked(true);
    smoothScrollToRef(targetWorkSection);
  };

  // Footer click => scroll top or navigate
  const handleFooterClick = () => {
    if (location.pathname === '/') {
      document.documentElement.scrollIntoView({
        behavior: 'auto',
        block: 'start',
      });
    } else {
      navigate('/');
    }
  };

const handleCloseModal = () => {
  setIsChatOpen(false);

  setTimeout(() => {
    const botDetails = document.querySelector('.chat-bot-details');
    if (!botDetails) return;

    // 1) Force remove .visible
    botDetails.classList.remove('visible');

    // 2) Force a DOM re-flow
    // Reading `offsetHeight` ensures the browser flushes any pending styles
    // so that a subsequent .classList.add('visible') triggers the CSS transition
    void botDetails.offsetHeight;

    // 3) Check if in viewport
    const rect = botDetails.getBoundingClientRect();
    const inViewport = rect.top < window.innerHeight && rect.bottom >= 0;

    // 4) If it's in viewport, re-add .visible so it re-animates from left to right
    if (inViewport) {
      botDetails.classList.add('visible');
    }

    // 5) If you want the observer to keep doing its normal job,
    //    you can unobserve/observe. But if the user hasn't scrolled,
    //    the intersection won't change. This is optional.
    if (botObserverRef.current) {
      botObserverRef.current.unobserve(botDetails);
      botObserverRef.current.observe(botDetails);
    }
  }, 100);
  const currentScrollY = window.scrollY;
    localStorage.setItem('scrollPosition', currentScrollY.toString());

    // 2. Reload the page
    window.location.reload();

};


  // On mount
  useEffect(() => {
    // Animate main content
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
      setTimeout(() => {
        mainContent.classList.add('animate');
        setTimeout(() => {
          const button = mainContent.querySelector('.button-29');
          if (button) {
            button.classList.add('animate');
          }
        }, 91500);
      }, 300);
    }

    // IntersectionObserver: Heirloom
    const heirloomContainer = document.querySelector('.heirloom-container');
    const heirloomDetails = heirloomContainer?.querySelector('.heirloom-details');
    const observer1 = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          heirloomDetails?.classList.add('visible');
        } else {
          heirloomDetails?.classList.remove('visible');
        }
      },
      { threshold: .2}
    );
    if (heirloomContainer) {
      observer1.observe(heirloomContainer);
    }

    // Projects title
    const projectsTitle = document.querySelector('.projects-title');
    const observer2 = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          projectsTitle?.classList.add('visible');
        } else {
          projectsTitle?.classList.remove('visible');
        }
      },
      { threshold: 0.1 }
    );
    if (projectsTitle) {
      observer2.observe(projectsTitle);
    }

    // Intersection: ChatBot details
    const botDetails = document.querySelector('.chat-bot-details');
    if (botDetails) {
      botObserverRef.current = new IntersectionObserver(
        ([entry]) => {
          // For instance, require 80% of the element to be visible:
          if (entry.isIntersecting) {
            botDetails.classList.add('visible');
          } else {
            botDetails.classList.remove('visible');
          }
        },
        { threshold: [0.0, 0.8, 1.0] }
      );

      botObserverRef.current.observe(botDetails);
    }

    // Intersection: FitnessPal
    const fitnessPalDetails = document.querySelector('.fitness-pal-details-minimized');
    const fitnessPalObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fitnessPalDetails?.classList.add('visible');
        } else {
          fitnessPalDetails?.classList.remove('visible');
        }
      },
      { threshold: 0.3 }
    );
    if (fitnessPalDetails) {
      fitnessPalObserver.observe(fitnessPalDetails);
    }

    // Intersection: Platformer
    const platformerDetails = document.querySelector('.vertical-world-details-minimized');
    const platformerObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          platformerDetails?.classList.add('visible');
        } else {
          platformerDetails?.classList.remove('visible');
        }
      },
      { threshold: 0.3 }
    );
    if (platformerDetails) {
      platformerObserver.observe(platformerDetails);
    }

    // Cleanup
    return () => {
      observer1.disconnect();
      observer2.disconnect();
      botObserverRef.current?.disconnect();
      fitnessPalObserver.disconnect();
      platformerObserver.disconnect();
    };
  }, []);

  return (
    <div className="home-page">
      <Header
        onProjectsClick={toggleSubheader}
        aboutMeRef={aboutMeContainerRef}
        onContactClick={formContainerRef}
        onCloseSubheader={closeSubheader}
      />

      <main className="home-main">
        <section className="main-content">
          <div className="holder">
            <div className="title-left">Hello, I am Kris. I'm a</div>
            <div className="title-right">
              <AnimatedWords />
            </div>
          </div>
          <button
            className="button-29"
            role="button"
            onClick={() => smoothScrollTo('projects-section')}
          >
            View My Work
          </button>
        </section>
      </main>

      <div className="about-me-container" ref={aboutMeContainerRef}>
        <div className="about-me-img">
          <img
            src="https://i.imgur.com/hxU8pib.jpeg"
            alt="Portrait of Kris"
          />
        </div>

        <div className="about-me-title-container">
          <div className="about-me-title">
            <h1> About Me </h1>
          </div>
          <div className="about-me-text">
            <p>
              Hi, I’m Kristopher Ilich—a creative turned full-stack developer with a passion for blending artistry and technology. With expertise in JavaScript, React, and cloud platforms, I craft innovative software and intuitive designs. Outside work, I enjoy gaming, reef-keeping, and championing ocean conservation.
            </p>
          </div>
        </div>

        <div className="skills-container">
          <SkillsGrid />
        </div>
      </div>

      {/* SUBHEADER */}
      <div
        className={`subheader ${
          isSubheaderVisible ? 'subheader-visible' : ''
        } ${isScrolled ? 'scrolled' : ''}`}
      >
        <div className="subheader-content">
          <button
            onClick={() => smoothScrollToRef(heirloomContainerRef)}
          >
            Heirloom
          </button>
          <button onClick={() => smoothScrollToRef(aiContainerRef)}>
            AI Assistant
          </button>
          <button onClick={() => smoothScrollToRef(nutritionContainerRef)}>
            My Nutrition Pal
          </button>
          <button onClick={() => smoothScrollToRef(verticalWorldContainerRef)}>
            Vertical World
          </button>
        </div>
      </div>
      {/* END SUBHEADER */}

      <div className="all-projects-wrapper" ref={projectsWrapperRef}>
        {/* Heirloom */}
        <div className="heirloom-container" ref={heirloomContainerRef}>
          <div className="heirloom-wrapper">
            <div
              className="projects-title"
              id="projects-section"
              ref={targetWorkSection}
            >
              <h1>Projects</h1>
            </div>
            <div className="heirloom-img" >
              <img
                src="https://i.imgur.com/qnJlmYt.jpeg"
                alt="Heirloom Image"
              />
            </div>
            <div className="heirloom-details" >
              <h1 className="heirloom-title">Heirloom</h1>
              <p className="heirloom-description">
               Currently in development with Swift, Shopify API, and GCP, Heirloom is a marketplace that lets users present highly detailed 3D representations of items for an immersive online buying and selling experience.
              </p>
              <p className="heirloom-alt-description">
                Currently in development with Swift, Shopify API, and GCP, Heirloom is a marketplace that utilizes Lidar to let users present 3D items for immersive buying and selling.
              </p>
              <button className="button-29" role="button">
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* AI Assistant */}
        <div>
          <div className="chat-bot-container" ref={aiContainerRef}>
            {/* Minimized ChatBot Section */}
            {!isChatOpen && (
              <div className="chat-bot-wrapper-minimized">
                <div
                  className="chat-bot-img"
                  onClick={() => setIsChatOpen(true)}
                  style={{ cursor: 'pointer' }}
                >
                  <img
                    src="https://i.imgur.com/p3QVc5l.jpeg"
                    alt="ChatBot"
                  />
                </div>

                <div className="chat-bot-details">
                  <h1 className="chat-bot-title">AI Assistant</h1>
                  <p className="chat-bot-description">
                    I built a GPT-powered chatbot using OpenAI's API, React, and state
                      management to deliver AI-driven responses about my skills, projects,
                      and experience. Click below to try it out!
                  </p>
                  <button
                    className="button-29"
                    onClick={() => setIsChatOpen(true)}
                  >
                    Try It Out
                  </button>
                </div>
              </div>
            )}

            {/* Fullscreen ChatBot Overlay */}
            {isChatOpen && (
              <div className="chat-bot-overlay">
                <div className="chat-bot-modal">
                  <button
                    className="chat-bot-close-button"
                    // >>>>>> Manually re-check or force .visible

                    onClick={handleCloseModal}
                  >
                    X
                  </button>
                  <ChatBot />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* My Nutrition Pal */}
        <div className="fitness-pal-container" ref={nutritionContainerRef}>

          {/* Minimized Fitness Pal Section */}
          {!isFitnessPalOpen && (
            <div className="fitness-pal-wrapper-minimized">
              <div
                className="fitness-pal-img"
                onClick={() => setIsFitnessPalOpen(true)}
                style={{ cursor: 'pointer' }}
              >
                {/* A placeholder or small fitness pal image */}
                <img
                  src="https://i.imgur.com/BtKp557.jpeg"
                  alt="MyFitnessPal"
                />
              </div>

              <div className="fitness-pal-details-minimized">
                <h1 className="fitness-pal-title">My Nutrition Pal</h1>
                <p className="fitness-pal-description">
                  A streamlined nutrition calculator built with React.js and CSS.
                  It quickly computes your daily calorie intake and macros, making it easy
                  to stay on track with your goals.
                </p>
                <button className="button-29" onClick={() => setIsFitnessPalOpen(true)}>
                  Try It Out
                </button>
              </div>
            </div>
          )}

          {/* Fullscreen Fitness Pal Overlay */}
          {isFitnessPalOpen && (
            <div className="fitness-pal-overlay">
              <div className="fitness-pal-modal">
                <button
                  className="fitness-pal-close-button"
                  onClick={handleCloseModal}
                >
                  X
                </button>

                {/* Inside this modal, render whatever you'd normally show full-screen:
                    MyFitnessPal component, or a bigger UI, etc. */}
                <MyFitnessPal className="my-fitness-pal-modal-content" />
              </div>
            </div>
          )}
        </div>

       {/* Vertical World (Platformer) */}
       <div className="vertical-world-container" ref={verticalWorldContainerRef}>

         {/* Minimized Vertical World Section */}
         {!isVerticalWorldOpen && (
           <div className="vertical-world-wrapper-minimized">
             <div
               className="vertical-world-img"
               onClick={() => setIsVerticalWorldOpen(true)}
               style={{ cursor: 'pointer' }}
             >
               {/* A placeholder or small platformer image, or partial UI */}
               <img
                 src="https://i.imgur.com/9pLBvOe.jpeg"
                 alt="Vertical World"
               />
             </div>

             <div className="vertical-world-details-minimized">
               <h1 className="vertical-world-title">Vertical World</h1>
               <p className="vertical-world-description">
                   This procedurally generated platformer leverages dynamic algorithms to
                     create a unique environment for each playthrough. Platforms, hazards, and
                     checkpoints are algorithmically randomized, ensuring a non-repetitive
                     gameplay experience. The design emphasizes replayability through
                     adaptable, scalable logic.
               </p>
               <button className="button-29" onClick={() => setIsVerticalWorldOpen(true)}>
                 Play Now
               </button>
             </div>
           </div>
         )}

         {/* Fullscreen Vertical World Overlay */}
         {isVerticalWorldOpen && (
           <div className="vertical-world-overlay">
             <div className="vertical-world-modal">
               <button
                 className="vertical-world-close-button"
                 onClick={handleCloseModal}
               >
                 X
               </button>

               {/* Inside this modal, render your full PlatformerGame component */}
               <PlatformerGame className="vertical-world-modal-content" />
             </div>
           </div>
         )}

       </div>
      </div>

      <div className="form-container" ref={formContainerRef}>
        <InquiryForm />
      </div>

      <footer>
        <div className="footer-container">
          <button className="scroll-to-top" onClick={handleFooterClick}>
            <span className="arrow-up">⬆</span>
          </button>
          <div className="footer-links">
            <a
              href="https://github.com/krisilich"
              target="_blank"
              aria-label="GitHub"
            >
              <img
                src="https://i.imgur.com/yHBt8q5.png"
                alt="GitHub Icon"
                className="github-icon"
              />
            </a>
            <a
              href="mailto:kristopherilich@gmail.com"
              aria-label="Email"
            >
              <img
                src="https://i.imgur.com/Dh0OnLq.png"
                alt="Email Icon"
                className="email-icon"
              />
            </a>
            <a
              href="https://www.linkedin.com/in/kristopher-ilich/"
              target="_blank"
              aria-label="LinkedIn"
            >
              <img
                src="https://i.imgur.com/9ZLEvcj.png"
                alt="LinkedIn Icon"
                className="linkedin-icon"
              />
            </a>
          </div>
          <p>© Kristopher Ilich 2025</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
