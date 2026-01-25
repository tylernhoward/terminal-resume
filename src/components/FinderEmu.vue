<template>
  <div class="finder">
    <div class="finder-toolbar">
      <div class="toolbar-left">
        <button class="toolbar-btn" disabled>
          <svg viewBox="0 0 16 16" fill="currentColor"><path d="M10.5 3L5.5 8l5 5" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
        <button class="toolbar-btn" disabled>
          <svg viewBox="0 0 16 16" fill="currentColor"><path d="M5.5 3L10.5 8l-5 5" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
      </div>
      <div class="toolbar-center">
        <div class="breadcrumb">
          <span class="breadcrumb-icon">📁</span>
          <span class="breadcrumb-text">Projects</span>
        </div>
      </div>
      <div class="toolbar-right">
        <div class="view-toggle">
          <button class="view-btn active" title="Icon view">
            <svg viewBox="0 0 16 16"><rect x="2" y="2" width="5" height="5" rx="1" fill="currentColor"/><rect x="9" y="2" width="5" height="5" rx="1" fill="currentColor"/><rect x="2" y="9" width="5" height="5" rx="1" fill="currentColor"/><rect x="9" y="9" width="5" height="5" rx="1" fill="currentColor"/></svg>
          </button>
          <button class="view-btn" title="List view">
            <svg viewBox="0 0 16 16"><rect x="2" y="3" width="12" height="2" rx="0.5" fill="currentColor"/><rect x="2" y="7" width="12" height="2" rx="0.5" fill="currentColor"/><rect x="2" y="11" width="12" height="2" rx="0.5" fill="currentColor"/></svg>
          </button>
        </div>
      </div>
    </div>
    <div class="finder-content">
      <div class="grid">
        <FinderItem name="CLARK"/>
        <FinderItem name="Security Injections"/>
        <FinderItem name="Markdown Editor"/>
        <FinderItem name="Job Jar"/>
        <FinderItem name="Lol CLI"/>
        <FinderItem name="Phishing Visualization"/>
        <FinderItem name="WWYDH"/>
        <FinderItem name="Photo Spot"/>
        <FinderItem name="HeRO"/>
        <FinderItem name="Morning Briefing"/>
      </div>
    </div>
    <div class="finder-status">
      <span>10 items</span>
    </div>
    <ProjectModal :data="projectDataMap"/>
  </div>
</template>

<script setup lang="ts">
import FinderItem from './FinderItem.vue'
import ProjectModal from './ProjectModal.vue'
import type { ProjectData } from './ProjectData'

enum Projects {
  CLARK = 'CLARK',
  SecurityInjections = 'Security Injections',
  MarkdownEditor = 'Markdown Editor',
  JobJar = 'Job Jar',
  LolCLI = 'Lol CLI',
  PhishingVisualization = 'Phishing Visualization',
  WWYDH = 'WWYDH',
  PhotoSpot = 'Photo Spot',
  HeRO = 'HeRO',
  MorningBriefing = 'Morning Briefing'
}

const projectDataMap = new Map<string, ProjectData>([
  [Projects.CLARK, {
    description: `Developer on team responsible for implementing a Cybersecurity curriculum management platform to curate and share learning objectives in academia.
    Application uses new web technologies and the MEAN stack as part of a project funded by the National Science Foundation.`,
    image: 'clark.png',
    githubUrl: '',
    exploreUrl: 'https://clark.center'
  }],
  [Projects.SecurityInjections, {
    description: `Worked for the Computer and Information Sciences department in a small team as a lead developer responsible
      for developing a web application used as a instructional tool for introductory Computer Science students
      and other cyber-related majors.
      The current iteration is a single-page web application that makes use of the Angular JavaScript framework and
      template-based storage in order to dynamically generate instructional content from JSON.`,
    image: 'threeo.jpg',
    githubUrl: '',
    exploreUrl: 'http://cis1.towson.edu/~cyber4all/modules/nanomodules/Integer_Error-CS0_C++_Demo.html'
  }],
  [Projects.MarkdownEditor, {
    description: 'WYSIWYG editor for markdown using a self-ported library (ng-tui-editor) for Angular 2+',
    image: 'markdowner.png',
    githubUrl: 'https://github.com/tylernhoward/ngx-tui-editor',
    exploreUrl: 'http://www.tylernhoward.com/markdowner'
  }],
  [Projects.JobJar, {
    description: 'Simple Alexa skill that randomly selects a household chore you have added to a list to help you stop procrastinating',
    image: '',
    githubUrl: 'https://github.com/tylernhoward/alexa-job-jar',
    exploreUrl: ''
  }],
  [Projects.LolCLI, {
    description: 'Tiny command-line app hosted on NPM that outputs multiple categories of jokes retrieved from Reddit',
    image: 'lol.png',
    githubUrl: 'https://github.com/tylernhoward/lol-node-cli',
    exploreUrl: ''
  }],
  [Projects.PhishingVisualization, {
    description: `Angular based application aimed at visualizing current online phishing threats across the world. Data is retrieved
      from PhishTank, and is presented in the form of geo-location data on a map, dynamic charts, and a filterable grid.
      Makes use of the PhishTank API, Google Maps API, and FreeGeoIP API.`,
    image: 'phishVisual.jpg',
    githubUrl: 'https://github.com/tylernhoward/phishing-threats',
    exploreUrl: 'http://phishing-threats.herokuapp.com'
  }],
  [Projects.WWYDH, {
    description: `What Would You Do Here?: A semester project that involved continuing development on a web application for a nonprofit client. This application
      aimed to encourage community involvement in Baltimore City, MD by making use of vacant lots for user-suggested projects
      and events.
      This project manifested as a PHP based website that relied on a mySQL database and several APIs. Used the Agile development
      process to gather the client's requirements and input throughout the semester.`,
    image: 'wwydh.jpg',
    githubUrl: 'https://github.com/tylernhoward/wwydh',
    exploreUrl: 'http://wwydh-2017.herokuapp.com'
  }],
  [Projects.PhotoSpot, {
    description: 'Android application that utilizes location services to pull local pictures from the Flickr API.',
    image: 'photospot-small.png',
    githubUrl: 'https://github.com/tylernhoward/Photo-Spot.git',
    exploreUrl: ''
  }],
  [Projects.HeRO, {
    description: `Worked in a small team through the Office and Technology Services at Towson University to create and deploy
      a desktop application written in Visual Basic.
      The application is a run-on-startup tool that provides help resources, videos, and relevant campus alerts to
      instructor workstations throughout multiple campuses of Towson University. To ensure reliability across different
      machines, the tool relies only on access to the web and a shared drive.`,
    image: 'hero.jpg',
    githubUrl: '',
    exploreUrl: ''
  }],
  [Projects.MorningBriefing, {
    description: `ASP.net application aimed at providing a dashboard for users with information regarding weather, news, and todos. Makes
      use of the OpenWeatherMap API and the News API. Also includes globalization, theming, and the Entity framework among
      other features.`,
    image: 'mornbrief.jpg',
    githubUrl: 'https://github.com/tylernhoward/morning-briefing',
    exploreUrl: ''
  }],
])
</script>

<style scoped>
.finder {
  color: #1D1D1F;
  background: linear-gradient(180deg, #FFFFFF 0%, #F5F5F7 100%);
  height: calc(100% - 38px);
  margin-top: 38px;
  display: flex;
  flex-direction: column;
}

.finder-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 12px;
  background: linear-gradient(180deg, #F8F8F8 0%, #ECECEC 100%);
  border-bottom: 1px solid #D1D1D1;
  min-height: 32px;
}

.toolbar-left,
.toolbar-right {
  display: flex;
  align-items: center;
  gap: 4px;
}

.toolbar-center {
  flex: 1;
  display: flex;
  justify-content: center;
}

.toolbar-btn {
  width: 28px;
  height: 24px;
  border: none;
  background: transparent;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1D1D1F;
  transition: background 0.15s ease;
}

.toolbar-btn:disabled {
  opacity: 0.35;
  cursor: default;
}

.toolbar-btn:not(:disabled):hover {
  background: rgba(0, 0, 0, 0.06);
}

.toolbar-btn svg {
  width: 14px;
  height: 14px;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  background: rgba(0, 0, 0, 0.04);
  border-radius: 6px;
}

.breadcrumb-icon {
  font-size: 14px;
}

.breadcrumb-text {
  font-size: 13px;
  font-weight: 500;
  color: #1D1D1F;
}

.view-toggle {
  display: flex;
  background: rgba(0, 0, 0, 0.06);
  border-radius: 6px;
  padding: 2px;
}

.view-btn {
  width: 26px;
  height: 22px;
  border: none;
  background: transparent;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6E6E73;
  transition: all 0.15s ease;
}

.view-btn.active {
  background: white;
  color: #1D1D1F;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.view-btn svg {
  width: 14px;
  height: 14px;
}

.finder-content {
  flex: 1;
  overflow: auto;
  padding: 16px;
}

.finder-content::-webkit-scrollbar {
  width: 14px;
}

.finder-content::-webkit-scrollbar-track {
  background: transparent;
}

.finder-content::-webkit-scrollbar-thumb {
  background: #C7C7CC;
  border-radius: 7px;
  border: 3px solid #F5F5F7;
}

.finder-content::-webkit-scrollbar-thumb:hover {
  background: #A8A8AD;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 8px;
  justify-items: center;
}

.finder-status {
  padding: 4px 12px;
  background: linear-gradient(180deg, #F8F8F8 0%, #ECECEC 100%);
  border-top: 1px solid #D1D1D1;
  font-size: 11px;
  color: #6E6E73;
  text-align: center;
}

@media only screen and (max-width: 768px) {
  .finder {
    height: calc(100% - 32px);
    margin-top: 32px;
  }

  .finder-toolbar {
    padding: 4px 8px;
    min-height: 28px;
  }

  .breadcrumb {
    padding: 3px 8px;
  }

  .breadcrumb-text {
    font-size: 12px;
  }

  .grid {
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
    gap: 4px;
  }

  .finder-content {
    padding: 12px;
  }
}

@media only screen and (max-width: 480px) {
  .toolbar-left,
  .toolbar-right {
    display: none;
  }

  .grid {
    grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
  }

  .finder-content {
    padding: 8px;
  }
}
</style>
