# FocusFlow: Pomodoro Study Session Timer and Focus Task Manager

FocusFlow is a free, responsive study companion that combines a Pomodoro timer, a study task manager, a daily study planner and a progress dashboard in one clean web page. It is built with plain HTML, CSS and JavaScript, so it runs in any modern browser with no installation.

## Introduction

Many students struggle to stay focused for long periods or to keep track of what they need to study. FocusFlow uses the Pomodoro Technique (focused study sprints separated by short breaks) and pairs it with tasks, a timetable and progress tracking, so every study session is planned, timed and measured in one place.

## Objectives

- Help students work in focused 25-minute sessions with planned breaks.
- Make daily study tasks easy to add, prioritise and complete.
- Plan study blocks for the day and tick them off as they are finished.
- Show clear, motivating progress for each day and across the whole term.
- Keep all data on the user's own device, with no sign-up required.

## Features

### Welcome Hero and Dashboard
- Welcome section with a live clock, today's date and a greeting that changes with the time of day.
- Quick actions and a daily goal summary on the dashboard.
- Smooth scrolling navigation with the current section highlighted as you scroll.
- Mobile menu for smaller screens.

### Pomodoro Timer
- Circular countdown with a smooth progress ring.
- Focus (25 min), Short Break (5 min) and Long Break (15 min) modes.
- Start, Pause, Resume, Reset and Skip controls.
- Automatic long break after every 4 completed focus sessions (adjustable in Settings).
- Audio chime when a session ends (can be turned off in Settings).
- Only one timer can run at a time. The timer uses real clock time, so it stays accurate when the tab is in the background.
- Keyboard shortcut: press Space to start or pause.

### Study Task Manager
- Add tasks with a High, Medium or Low priority tag.
- Tick a checkbox to mark a task as completed.
- Pending and completed tasks appear in separate lists.
- Pending tasks are sorted by priority, then by the order they were added.
- Delete any task, or clear all completed tasks at once.

### Study Planner
- Add study blocks with a subject or topic and an optional start time.
- Upcoming blocks are sorted by time. Mark blocks done, or delete them.
- Completed blocks move to a Done list, which can be cleared.

### Daily Progress Tracker
- Today's completed Pomodoro sessions and focus minutes.
- Daily goal with a progress bar and a message when it is reached.
- Daily statistics start fresh at midnight, because each day is stored separately.

### Weekly Analytics
- A 7-day bar chart of completed sessions, with today highlighted.
- Weekly totals for sessions, focus time and your best day.

### All-Time Statistics
- Total completed sessions, total focus time, active study days and the average sessions per active day.

### Achievements
- Six badges unlock automatically from your saved progress: First Focus, Getting Warm, Focus Pro, Goal Crusher, Study Machine and Consistency King.

### Motivation Corner
- Rotating motivational study quotes, with a button for a new quote.
- Four study tips: one task per Pomodoro, active recall, real breaks and hardest subject first.

### Focus Environment (Optional)
- Gentle Rain, Forest Nature and Soft Hum background sounds.
- Generated in the browser with the Web Audio API, so no audio files are needed.
- Off by default. Your choice is saved in Settings.

### Settings
- Change focus, short break and long break lengths.
- Change how many sessions come before a long break.
- Change the daily study goal.
- Turn the end-of-session chime on or off.

### Data Storage
- Tasks, planner blocks, timer settings and daily progress are saved in the browser's localStorage.
- Data remains after refreshing the page or reopening the browser.

## Technologies Used

- HTML5 for structure and accessible markup, including the native dialog for Settings
- CSS3 for layout (Grid and Flexbox), animations, hover effects and responsive design
- Vanilla JavaScript (ES2020+) for timer logic, task and planner management, analytics and storage
- Web Audio API for the completion chime and ambient focus sounds
- IntersectionObserver for scroll highlighting and reveal animations
- Inter font from Google Fonts
- Inline SVG icons (no icon library)

## Project Structure

```
index.html   Page structure, SVG icon sprite, sections and Settings dialog
style.css    Colours, layout, components, animations and responsive rules
script.js    Timer, tasks, planner, analytics, badges, sounds and settings logic
README.md    Project documentation
```

## Setup

No installation or paid service is needed.

1. Download or clone this repository.
2. Open `index.html` in a modern browser (Chrome, Edge, Firefox or Safari), or
3. Serve the folder with any static server, for example the VS Code "Live Server" extension or `python -m http.server`, and visit the address it shows.

Note: the project also contains some unused React/Vite starter files from the project template (such as `package.json`, `vite.config.ts` and the Tailwind config). The website does not need them. You can ignore them, or delete them to keep the repository tidy.

## Deployment (Free)

### GitHub Pages
1. Create a new public repository on GitHub and upload `index.html`, `style.css` and `script.js` (and this README).
2. Go to **Settings > Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and the `/ (root)` folder, then save.
4. After a minute your site is live at `https://<your-username>.github.io/<repository-name>/`.

### Netlify
1. Sign in at netlify.com and choose **Add new site > Deploy manually**.
2. Drag the project folder (containing `index.html`, `style.css` and `script.js`) into the upload area.
3. Netlify gives you a free public link. You can also connect the GitHub repository for automatic deploys.

## Usage

1. **Start a session:** press **Start** or the Space bar. Use **Pause**, **Resume**, **Reset** and **Skip** as needed.
2. **Change the mode:** use the Focus, Short Break or Long Break tabs when the timer is idle.
3. **Add a task:** type a name, choose a priority and press **Add Task**. Tick it when done.
4. **Plan your day:** add a subject with a start time in the planner, then mark blocks done as you finish them.
5. **Track progress:** check the dashboard, the weekly chart and the badges to see how you are doing.
6. **Customise:** open **Settings** to change durations, the daily goal and the chime.
7. **Focus sound (optional):** pick a background sound in the Focus Environment section. Choose Sound off to stop it.

## Notes and Limitations

- Data is stored only in the browser that you use. Clearing browser data, or using a different browser or device, starts with an empty app.
- Browsers only allow sound after a click on the page, so the chime and ambient sounds start after your first interaction.
- The Pomodoro timer's completion chime is generated by the browser, so it needs a device with audio output.

## Team

- Team name: [Your Team Name]
- Members: [Member One], [Member Two], [Member Three]
- Course: [Course Name and Code]
