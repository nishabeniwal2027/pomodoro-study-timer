/* FocusFlow: Pomodoro timer, task manager, study planner and progress tracker. */

/* ---------- Configuration ---------- */

const STORAGE_KEYS = {
  settings: 'focusflow.settings',
  tasks: 'focusflow.tasks',
  progress: 'focusflow.progress',
  planner: 'focusflow.planner',
};

const DEFAULT_SETTINGS = {
  focusMinutes: 25,
  shortBreakMinutes: 5,
  longBreakMinutes: 15,
  sessionsBeforeLongBreak: 4,
  dailyGoal: 8,
  soundEnabled: true,
  ambientSound: 'off',
};

const SETTING_LIMITS = {
  focusMinutes: { label: 'Focus length', min: 1, max: 120 },
  shortBreakMinutes: { label: 'Short break', min: 1, max: 30 },
  longBreakMinutes: { label: 'Long break', min: 1, max: 60 },
  sessionsBeforeLongBreak: { label: 'Sessions before a long break', min: 2, max: 8 },
  dailyGoal: { label: 'Daily goal', min: 1, max: 20 },
};

const AMBIENT_LABELS = {
  off: 'Sound off',
  rain: 'Gentle Rain',
  forest: 'Forest Nature',
  hum: 'Soft Hum',
};
const AMBIENT_VOLUME = 0.6;

const MODES = {
  focus: {
    label: 'Focus Session',
    settingKey: 'focusMinutes',
    idleText: 'Press start when ready',
    runningText: 'Deep work in progress',
  },
  shortBreak: {
    label: 'Short Break',
    settingKey: 'shortBreakMinutes',
    idleText: 'Press start when ready',
    runningText: 'Relax and recharge',
  },
  longBreak: {
    label: 'Long Break',
    settingKey: 'longBreakMinutes',
    idleText: 'Press start when ready',
    runningText: 'Stretch, hydrate and rest your eyes',
  },
};

const BADGES = [
  { title: 'First Focus', desc: 'Complete your first Pomodoro.', icon: 'icon-check', target: 1, metric: 'sessions' },
  { title: 'Getting Warm', desc: 'Complete 5 Pomodoros.', icon: 'icon-zap', target: 5, metric: 'sessions' },
  { title: 'Focus Pro', desc: 'Complete 10 Pomodoros.', icon: 'icon-sparkles', target: 10, metric: 'sessions' },
  { title: 'Goal Crusher', desc: 'Reach your daily goal on any day.', icon: 'icon-target', target: 1, metric: 'goalDays' },
  { title: 'Study Machine', desc: 'Complete 25 Pomodoros.', icon: 'icon-trophy', target: 25, metric: 'sessions' },
  { title: 'Consistency King', desc: 'Reach your daily goal on 3 days.', icon: 'icon-calendar', target: 3, metric: 'goalDays' },
];

const QUOTES = [
  'Small steps every day lead to big results.',
  'Done is better than perfect.',
  'One focused hour beats three distracted ones.',
  'Little by little, one travels far.',
  'Progress, not perfection, is the goal of every study session.',
  'Your future self is cheering you on. Keep going.',
  'Start where you are. Use what you have. Do what you can.',
  'Consistency beats intensity when you study one session at a time.',
];

const PRIORITY_RANK = { high: 0, medium: 1, low: 2 };
const MAX_TASK_LENGTH = 120;
const MAX_PLAN_SUBJECT_LENGTH = 80;
const TICK_INTERVAL_MS = 250;
const RING_RADIUS = 124;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;
const CHART_DAYS = 7;
const DEFAULT_TITLE = document.title;

/* ---------- DOM references ---------- */

const timerCard = document.getElementById('timer');
const modeTabs = document.querySelectorAll('.mode-tab');
const ringProgress = document.getElementById('ringProgress');
const timerLabel = document.getElementById('timerLabel');
const timerDisplay = document.getElementById('timerDisplay');
const timerStatus = document.getElementById('timerStatus');
const cycleInfo = document.getElementById('cycleInfo');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const skipBtn = document.getElementById('skipBtn');

const liveClockEl = document.getElementById('liveClock');
const liveDateEl = document.getElementById('liveDate');
const greetingEl = document.getElementById('greeting');
const heroQuoteEl = document.getElementById('heroQuote');

const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');

const progressCard = document.getElementById('progress');
const todaySessionsEl = document.getElementById('todaySessions');
const todayMinutesEl = document.getElementById('todayMinutes');
const goalTextEl = document.getElementById('goalText');
const goalBarEl = document.getElementById('goalBar');
const goalFillEl = document.getElementById('goalFill');
const goalMessageEl = document.getElementById('goalMessage');
const goalPercentEl = document.getElementById('goalPercent');
const goalTargetEl = document.getElementById('goalTarget');
const goalMilestonesEl = document.getElementById('goalMilestones');
const statCompletedTasksEl = document.getElementById('statCompletedTasks');

const weekChartEl = document.getElementById('weekChart');
const weekEmptyEl = document.getElementById('weekEmpty');
const weekTotalEl = document.getElementById('weekTotal');
const weekMinutesEl = document.getElementById('weekMinutes');
const weekBestEl = document.getElementById('weekBest');

const totalSessionsEl = document.getElementById('totalSessions');
const allTimeMinutesEl = document.getElementById('allTimeMinutes');
const allTimeDaysEl = document.getElementById('allTimeDays');
const allTimeAverageEl = document.getElementById('allTimeAverage');
const allTimeSummaryEl = document.getElementById('allTimeSummary');

const badgeGridEl = document.getElementById('badgeGrid');
const badgeSummaryEl = document.getElementById('badgeSummary');

const quoteTextEl = document.getElementById('quoteText');
const newQuoteBtn = document.getElementById('newQuoteBtn');

const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskError = document.getElementById('taskError');
const taskSummaryEl = document.getElementById('taskSummary');
const pendingList = document.getElementById('pendingList');
const completedList = document.getElementById('completedList');
const pendingCountEl = document.getElementById('pendingCount');
const completedCountEl = document.getElementById('completedCount');
const pendingEmptyEl = document.getElementById('pendingEmpty');
const completedEmptyEl = document.getElementById('completedEmpty');
const clearCompletedBtn = document.getElementById('clearCompletedBtn');

const plannerForm = document.getElementById('plannerForm');
const plannerSubject = document.getElementById('plannerSubject');
const plannerTime = document.getElementById('plannerTime');
const plannerError = document.getElementById('plannerError');
const upcomingList = document.getElementById('upcomingList');
const doneList = document.getElementById('doneList');
const upcomingCountEl = document.getElementById('upcomingCount');
const doneCountEl = document.getElementById('doneCount');
const upcomingEmptyEl = document.getElementById('upcomingEmpty');
const doneEmptyEl = document.getElementById('doneEmpty');
const clearDoneBtn = document.getElementById('clearDoneBtn');

const ambientButtons = document.querySelectorAll('.ambient-option');
const ambientStatusEl = document.getElementById('ambientStatus');

const settingsDialog = document.getElementById('settingsDialog');
const settingsForm = document.getElementById('settingsForm');
const settingsError = document.getElementById('settingsError');
const toastEl = document.getElementById('toast');

/* ---------- State ---------- */

let settings = loadSettings();
let tasks = loadTasks();
let plannerItems = loadPlannerItems();
let progressRenderedDay = '';
let toastTimerId = null;
let audioContext = null;
let currentQuoteIndex = -1;
const ambientState = { nodes: [] };

const timerState = {
  mode: 'focus',
  status: 'idle', // 'idle' | 'running' | 'paused'
  remainingMs: 0,
  endTimestamp: 0,
  completedFocusInCycle: 0,
  intervalId: null,
};

/* ---------- Storage helpers ---------- */

function readStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw === null ? fallback : JSON.parse(raw);
  } catch (error) {
    console.warn(`Could not read "${key}" from localStorage.`, error);
    return fallback;
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Could not save "${key}" to localStorage.`, error);
  }
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function loadSettings() {
  const saved = readStorage(STORAGE_KEYS.settings, {}) ?? {};
  const merged = { ...DEFAULT_SETTINGS };

  Object.keys(DEFAULT_SETTINGS).forEach((key) => {
    if (typeof saved[key] === typeof DEFAULT_SETTINGS[key]) {
      merged[key] = saved[key];
    }
  });

  Object.entries(SETTING_LIMITS).forEach(([key, { min, max }]) => {
    merged[key] = clamp(Math.round(merged[key]), min, max);
  });

  if (!Object.hasOwn(AMBIENT_LABELS, merged.ambientSound)) {
    merged.ambientSound = 'off';
  }

  return merged;
}

function loadTasks() {
  const saved = readStorage(STORAGE_KEYS.tasks, []);
  if (!Array.isArray(saved)) return [];
  return saved.filter(isValidTask);
}

function isValidTask(task) {
  return (
    task !== null &&
    typeof task === 'object' &&
    typeof task.id === 'string' &&
    typeof task.text === 'string' &&
    typeof task.completed === 'boolean' &&
    Object.hasOwn(PRIORITY_RANK, task.priority)
  );
}

function loadPlannerItems() {
  const saved = readStorage(STORAGE_KEYS.planner, []);
  if (!Array.isArray(saved)) return [];
  return saved.filter(isValidPlannerItem);
}

function isValidPlannerItem(item) {
  return (
    item !== null &&
    typeof item === 'object' &&
    typeof item.id === 'string' &&
    typeof item.subject === 'string' &&
    typeof item.time === 'string' &&
    typeof item.completed === 'boolean'
  );
}

function loadProgress() {
  const saved = readStorage(STORAGE_KEYS.progress, null);
  if (saved && typeof saved.history === 'object' && saved.history !== null) {
    return saved;
  }
  return { history: {} };
}

/* ---------- Date and formatting helpers ---------- */

/* Builds a YYYY-MM-DD key from the local date, so each day gets its own stats. */
function formatDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getTodayKey() {
  return formatDateKey(new Date());
}

function formatTime(ms) {
  const totalSeconds = Math.ceil(Math.max(0, ms) / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function formatMinutes(totalMinutes) {
  if (totalMinutes < 60) return `${totalMinutes}m`;
  return `${Math.floor(totalMinutes / 60)}h ${totalMinutes % 60}m`;
}

/* Converts a 24-hour "HH:MM" value from a time input into "9:30 AM". */
function formatClockTime(value) {
  if (!value) return 'Anytime';
  const [hours, minutes] = value.split(':').map(Number);
  const suffix = hours >= 12 ? 'PM' : 'AM';
  const displayHour = hours % 12 || 12;
  return `${displayHour}:${String(minutes).padStart(2, '0')} ${suffix}`;
}

function getModeDurationMs(mode) {
  return settings[MODES[mode].settingKey] * 60 * 1000;
}

function createIcon(name) {
  return `<svg class="icon" aria-hidden="true"><use href="#${name}"></use></svg>`;
}

/* ---------- Pomodoro timer ---------- */

function stopInterval() {
  if (timerState.intervalId !== null) {
    clearInterval(timerState.intervalId);
    timerState.intervalId = null;
  }
}

/* Uses an end timestamp instead of counting ticks, so the timer stays accurate in background tabs. */
function startTimer() {
  if (timerState.status === 'running') return;

  if (timerState.remainingMs <= 0) {
    timerState.remainingMs = getModeDurationMs(timerState.mode);
  }

  unlockAudio();
  stopInterval();
  timerState.endTimestamp = Date.now() + timerState.remainingMs;
  timerState.status = 'running';
  timerState.intervalId = window.setInterval(handleTimerTick, TICK_INTERVAL_MS);
  updateTimerView();
}

function pauseTimer() {
  if (timerState.status !== 'running') return;

  stopInterval();
  timerState.remainingMs = Math.max(0, timerState.endTimestamp - Date.now());
  timerState.status = 'paused';
  updateTimerView();
}

function toggleStartPause() {
  if (timerState.status === 'running') {
    pauseTimer();
  } else {
    startTimer();
  }
}

function switchMode(mode) {
  stopInterval();
  timerState.mode = mode;
  timerState.status = 'idle';
  timerState.remainingMs = getModeDurationMs(mode);
  updateTimerView();
}

function resetTimer() {
  switchMode(timerState.mode);
}

/* Counts the focus session toward the current cycle and returns the break type that follows. */
function advanceCycleAndGetBreakMode() {
  timerState.completedFocusInCycle += 1;

  if (timerState.completedFocusInCycle >= settings.sessionsBeforeLongBreak) {
    timerState.completedFocusInCycle = 0;
    return 'longBreak';
  }
  return 'shortBreak';
}

function skipSession() {
  const nextMode =
    timerState.mode === 'focus' ? advanceCycleAndGetBreakMode() : 'focus';
  switchMode(nextMode);
}

function handleTimerTick() {
  const remaining = timerState.endTimestamp - Date.now();

  if (remaining > 0) {
    timerState.remainingMs = remaining;
    updateTimerView();
    return;
  }

  stopInterval();
  timerState.status = 'idle';

  if (timerState.mode === 'focus') {
    recordCompletedPomodoro();
    const nextMode = advanceCycleAndGetBreakMode();
    showToast(
      nextMode === 'longBreak'
        ? 'Focus session complete. Enjoy your long break!'
        : 'Focus session complete. Time for a short break.',
    );
    switchMode(nextMode);
  } else {
    showToast('Break is over. Ready for another focus session?');
    switchMode('focus');
  }

  playCompletionChime();
}

function updateTimerView() {
  const { mode, status, remainingMs, completedFocusInCycle } = timerState;
  const modeConfig = MODES[mode];
  const totalMs = getModeDurationMs(mode);
  const fraction = totalMs > 0 ? remainingMs / totalMs : 0;
  const isRunning = status === 'running';

  ringProgress.style.strokeDashoffset = String(RING_CIRCUMFERENCE * (1 - fraction));
  timerDisplay.textContent = formatTime(remainingMs);
  timerLabel.textContent = modeConfig.label;
  timerStatus.textContent =
    status === 'paused'
      ? 'Paused'
      : isRunning
        ? modeConfig.runningText
        : modeConfig.idleText;

  timerCard.dataset.mode = mode;
  timerCard.classList.toggle('is-running', isRunning);

  modeTabs.forEach((tab) => {
    const isActive = tab.dataset.mode === mode;
    tab.classList.toggle('is-active', isActive);
    tab.setAttribute('aria-selected', String(isActive));
    tab.disabled = status !== 'idle';
  });

  updateControlButtons(isRunning, status === 'paused');

  cycleInfo.textContent = `${completedFocusInCycle} of ${settings.sessionsBeforeLongBreak} focus sessions completed in this cycle`;

  document.title = status === 'idle' ? DEFAULT_TITLE : `${timerDisplay.textContent} · ${modeConfig.label} | ${DEFAULT_TITLE}`;
}

/* Start is only available while the timer is stopped; Pause only while it runs. */
function updateControlButtons(isRunning, isPaused) {
  startBtn.disabled = isRunning;
  startBtn.querySelector('span').textContent = isPaused ? 'Resume' : 'Start';
  pauseBtn.disabled = !isRunning;
}

/* ---------- Audio: completion chime and ambient sounds ---------- */

function getAudioContext() {
  if (!audioContext) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return null;
    audioContext = new AudioContextClass();
  }
  return audioContext;
}

/* Browsers only allow audio after a user gesture, so the context is unlocked on Start. */
function unlockAudio() {
  const context = getAudioContext();
  if (context && context.state === 'suspended') {
    context.resume();
  }
}

function playCompletionChime() {
  if (!settings.soundEnabled) return;

  const context = getAudioContext();
  if (!context) return;
  if (context.state === 'suspended') context.resume();

  const notesHz = [659.25, 783.99, 987.77];
  notesHz.forEach((frequency, index) => {
    const startTime = context.currentTime + index * 0.28;
    const oscillator = context.createOscillator();
    const gain = context.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.exponentialRampToValueAtTime(0.3, startTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.5);

    oscillator.connect(gain).connect(context.destination);
    oscillator.start(startTime);
    oscillator.stop(startTime + 0.55);
  });
}

/* Generates a short block of random samples that is looped to make rain or wind noise. */
function createNoiseBuffer(context) {
  const length = context.sampleRate * 2;
  const buffer = context.createBuffer(1, length, context.sampleRate);
  const samples = buffer.getChannelData(0);
  for (let index = 0; index < length; index += 1) {
    samples[index] = Math.random() * 2 - 1;
  }
  return buffer;
}

/* Returns the audio nodes for one ambient sound. The first node is the master volume. */
function buildAmbientNodes(name, context) {
  const master = context.createGain();
  master.connect(context.destination);
  const nodes = [master];

  if (name === 'hum') {
    [136.1, 204.2].forEach((frequency, index) => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = 'sine';
      oscillator.frequency.value = frequency;
      gain.gain.value = index === 0 ? 0.06 : 0.025;
      oscillator.connect(gain).connect(master);
      oscillator.start();
      nodes.push(oscillator, gain);
    });
    return nodes;
  }

  const source = context.createBufferSource();
  source.buffer = createNoiseBuffer(context);
  source.loop = true;

  const filter = context.createBiquadFilter();
  const gain = context.createGain();
  if (name === 'rain') {
    filter.type = 'lowpass';
    filter.frequency.value = 1100;
    gain.gain.value = 0.25;
  } else {
    filter.type = 'bandpass';
    filter.frequency.value = 520;
    filter.Q.value = 0.6;
    gain.gain.value = 0.5;
  }
  source.connect(filter).connect(gain).connect(master);
  source.start();
  nodes.push(source, filter, gain);

  if (name === 'forest') {
    // A slow oscillator makes the breeze swell and fade.
    const breeze = context.createOscillator();
    const depth = context.createGain();
    breeze.frequency.value = 0.12;
    depth.gain.value = 0.3;
    breeze.connect(depth).connect(gain.gain);
    breeze.start();
    nodes.push(breeze, depth);
  }

  return nodes;
}

function stopAmbient() {
  const oldNodes = ambientState.nodes;
  if (oldNodes.length === 0) return;

  const master = oldNodes[0];
  const now = audioContext.currentTime;
  master.gain.cancelScheduledValues(now);
  master.gain.setTargetAtTime(0, now, 0.15);

  // Stop the sources after the fade-out so the sound does not cut off with a click.
  window.setTimeout(() => {
    oldNodes.forEach((node) => {
      if (typeof node.stop === 'function') node.stop();
      node.disconnect();
    });
  }, 600);

  ambientState.nodes = [];
}

function playAmbient(name) {
  stopAmbient();
  if (name === 'off') return;

  const context = getAudioContext();
  if (!context) {
    ambientStatusEl.textContent = 'Your browser does not support audio playback.';
    return;
  }
  if (context.state === 'suspended') context.resume();

  const nodes = buildAmbientNodes(name, context);
  const master = nodes[0];
  master.gain.setValueAtTime(0, context.currentTime);
  master.gain.linearRampToValueAtTime(AMBIENT_VOLUME, context.currentTime + 1.5);
  ambientState.nodes = nodes;
}

function renderAmbientButtons() {
  ambientButtons.forEach((button) => {
    button.setAttribute('aria-pressed', String(button.dataset.sound === settings.ambientSound));
  });

  ambientStatusEl.textContent =
    settings.ambientSound === 'off'
      ? 'Background sound is off.'
      : `Your saved sound is ${AMBIENT_LABELS[settings.ambientSound]}. Click it once to start playing.`;
}

function handleAmbientClick(event) {
  const button = event.target.closest('.ambient-option');
  if (!button) return;

  const name = button.dataset.sound;
  settings.ambientSound = name;
  writeStorage(STORAGE_KEYS.settings, settings);
  renderAmbientButtons();
  playAmbient(name);

  ambientStatusEl.textContent =
    name === 'off'
      ? 'Background sound is off.'
      : `Playing ${AMBIENT_LABELS[name]}. Choose Sound off to stop.`;
}

/* ---------- Daily progress, analytics and badges ---------- */

function recordCompletedPomodoro() {
  const progress = loadProgress();
  const todayKey = getTodayKey();
  const todayStats = progress.history[todayKey] || { sessions: 0, minutes: 0 };

  progress.history[todayKey] = {
    sessions: todayStats.sessions + 1,
    minutes: todayStats.minutes + settings.focusMinutes,
  };
  writeStorage(STORAGE_KEYS.progress, progress);
  renderStats();
}

function getDayStats(history, date) {
  return history[formatDateKey(date)] || { sessions: 0, minutes: 0 };
}

/* Totals across every saved day. Days are separate keys, so the daily stats reset automatically. */
function getAllTimeTotals(history) {
  const totals = { sessions: 0, minutes: 0, activeDays: 0, goalDays: 0 };

  Object.values(history).forEach((day) => {
    const sessions = Number(day.sessions) || 0;
    const minutes = Number(day.minutes) || 0;
    totals.sessions += sessions;
    totals.minutes += minutes;
    if (sessions > 0) totals.activeDays += 1;
    if (sessions >= settings.dailyGoal) totals.goalDays += 1;
  });

  return totals;
}

function renderStats() {
  const { history } = loadProgress();
  const today = new Date();
  const todayStats = getDayStats(history, today);
  const goal = settings.dailyGoal;
  const goalReached = todayStats.sessions >= goal;

  progressRenderedDay = getTodayKey();
  todaySessionsEl.textContent = todayStats.sessions;
  todayMinutesEl.textContent = formatMinutes(todayStats.minutes);
  goalTargetEl.textContent = goal;

  const goalPercent = clamp((todayStats.sessions / goal) * 100, 0, 100);
  goalFillEl.style.width = `${goalPercent}%`;
  goalPercentEl.textContent = `${Math.round(goalPercent)}%`;
  goalBarEl.setAttribute('aria-valuenow', String(Math.round(goalPercent)));
  goalTextEl.textContent = `${Math.min(todayStats.sessions, goal)} / ${goal} sessions`;
  goalMessageEl.textContent = goalReached
    ? 'Goal reached. Excellent work today!'
    : `${goal - todayStats.sessions} more session${goal - todayStats.sessions === 1 ? '' : 's'} to reach today's goal.`;
  progressCard.classList.toggle('goal-reached', goalReached);
  renderMilestones(goal, todayStats.sessions);

  renderWeeklyAnalytics(history, today);

  const totals = getAllTimeTotals(history);
  renderAllTimeStats(totals);
  renderBadges(totals);
}

/* Milestones sit at 25, 50, 75 and 100 percent of the goal. Reached ones are highlighted. */
function renderMilestones(goal, sessions) {
  const steps = [...new Set([0.25, 0.5, 0.75, 1].map((fraction) => Math.max(1, Math.ceil(goal * fraction))))];

  const items = steps.map((count) => {
    const item = document.createElement('li');
    item.className = `milestone${sessions >= count ? ' is-reached' : ''}`;
    item.textContent = `${count} ${count === 1 ? 'session' : 'sessions'}`;
    return item;
  });

  goalMilestonesEl.replaceChildren(...items);
}

function renderWeeklyAnalytics(history, today) {
  const days = [];
  for (let offset = CHART_DAYS - 1; offset >= 0; offset -= 1) {
    const date = new Date(today);
    date.setDate(today.getDate() - offset);
    days.push({ date, stats: getDayStats(history, date), isToday: offset === 0 });
  }

  const totalSessions = days.reduce((sum, day) => sum + day.stats.sessions, 0);
  const totalMinutes = days.reduce((sum, day) => sum + day.stats.minutes, 0);
  const bestDay = days.reduce((best, day) => (day.stats.sessions > best.stats.sessions ? day : best), days[0]);

  weekTotalEl.textContent = totalSessions;
  weekMinutesEl.textContent = formatMinutes(totalMinutes);
  weekBestEl.textContent =
    bestDay.stats.sessions > 0
      ? `${bestDay.date.toLocaleDateString('en-US', { weekday: 'long' })} (${bestDay.stats.sessions})`
      : 'None yet';
  weekEmptyEl.hidden = totalSessions > 0;

  const maxValue = Math.max(settings.dailyGoal, ...days.map((day) => day.stats.sessions));

  const columns = days.map(({ date, stats, isToday }) => {
    const column = document.createElement('div');
    column.className = `week-day${isToday ? ' is-today' : ''}`;
    column.title = `${stats.sessions} session${stats.sessions === 1 ? '' : 's'} on ${date.toLocaleDateString()}`;

    const value = document.createElement('span');
    value.className = 'week-value';
    value.textContent = stats.sessions;

    const track = document.createElement('div');
    track.className = 'week-bar-track';

    const bar = document.createElement('div');
    bar.className = 'week-bar';
    bar.style.height = `${(stats.sessions / maxValue) * 100}%`;
    track.appendChild(bar);

    const label = document.createElement('span');
    label.className = 'week-label';
    label.textContent = isToday
      ? 'Today'
      : date.toLocaleDateString('en-US', { weekday: 'short' });

    column.append(value, track, label);
    return column;
  });

  weekChartEl.replaceChildren(...columns);
}

function renderAllTimeStats(totals) {
  const average = totals.activeDays > 0 ? totals.sessions / totals.activeDays : 0;

  totalSessionsEl.textContent = totals.sessions;
  allTimeMinutesEl.textContent = formatMinutes(totals.minutes);
  allTimeDaysEl.textContent = totals.activeDays;
  allTimeAverageEl.textContent = String(Math.round(average * 10) / 10);
  allTimeSummaryEl.textContent =
    totals.sessions > 0
      ? `You have completed ${totals.sessions} Pomodoro${totals.sessions === 1 ? '' : 's'} across ${totals.activeDays} active study day${totals.activeDays === 1 ? '' : 's'}.`
      : 'Complete your first Pomodoro to start your all-time statistics.';
}

function renderBadges(totals) {
  let unlockedCount = 0;

  const cards = BADGES.map((badge) => {
    const current = totals[badge.metric];
    const unlocked = current >= badge.target;
    if (unlocked) unlockedCount += 1;

    const card = document.createElement('article');
    card.className = `badge-card${unlocked ? ' is-unlocked' : ''}`;

    const icon = document.createElement('div');
    icon.className = 'badge-icon';
    icon.innerHTML = createIcon(badge.icon);

    const title = document.createElement('h3');
    title.className = 'badge-title';
    title.textContent = badge.title;

    const desc = document.createElement('p');
    desc.className = 'badge-desc';
    desc.textContent = badge.desc;

    const progress = document.createElement('p');
    progress.className = 'badge-progress';
    progress.textContent = unlocked
      ? 'Unlocked'
      : `${Math.min(current, badge.target)} / ${badge.target}`;

    card.append(icon, title, desc, progress);
    return card;
  });

  badgeGridEl.replaceChildren(...cards);
  badgeSummaryEl.textContent = `${unlockedCount} of ${BADGES.length} unlocked`;
}

/* ---------- Tasks ---------- */

function saveTasks() {
  writeStorage(STORAGE_KEYS.tasks, tasks);
  renderTasks();
}

function createRecordId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function addTask(text, priority) {
  tasks.push({
    id: createRecordId(),
    text,
    priority,
    completed: false,
    createdAt: Date.now(),
    completedAt: null,
  });
  saveTasks();
}

function setTaskCompleted(id, completed) {
  const task = tasks.find((item) => item.id === id);
  if (!task) return;

  task.completed = completed;
  task.completedAt = completed ? Date.now() : null;
  saveTasks();
}

function deleteTask(id) {
  tasks = tasks.filter((item) => item.id !== id);
  saveTasks();
}

function clearCompletedTasks() {
  tasks = tasks.filter((item) => !item.completed);
  saveTasks();
}

/* Builds one row used by both the task list and the planner list. */
function createListItem({ id, text, completed, meta, deleteLabel }) {
  const item = document.createElement('li');
  item.className = `task-item${completed ? ' is-completed' : ''}`;
  item.dataset.id = id;

  const checkboxId = `item-${id}`;

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.id = checkboxId;
  checkbox.className = 'task-checkbox';
  checkbox.checked = completed;

  const label = document.createElement('label');
  label.className = 'task-label';
  label.htmlFor = checkboxId;

  const textEl = document.createElement('span');
  textEl.className = 'task-text';
  textEl.textContent = text;

  label.append(textEl, meta);

  const deleteButton = document.createElement('button');
  deleteButton.type = 'button';
  deleteButton.className = 'task-delete';
  deleteButton.setAttribute('aria-label', `${deleteLabel}: ${text}`);
  deleteButton.innerHTML = createIcon('icon-trash');

  item.append(checkbox, label, deleteButton);
  return item;
}

function createTaskElement(task) {
  const tag = document.createElement('span');
  tag.className = `tag tag-${task.priority}`;
  tag.textContent = task.priority.charAt(0).toUpperCase() + task.priority.slice(1);

  return createListItem({
    id: task.id,
    text: task.text,
    completed: task.completed,
    meta: tag,
    deleteLabel: 'Delete task',
  });
}

function renderTasks() {
  const pending = tasks
    .filter((task) => !task.completed)
    .sort((a, b) => PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority] || a.createdAt - b.createdAt);
  const completed = tasks
    .filter((task) => task.completed)
    .sort((a, b) => (b.completedAt || 0) - (a.completedAt || 0));

  pendingList.replaceChildren(...pending.map(createTaskElement));
  completedList.replaceChildren(...completed.map(createTaskElement));

  pendingCountEl.textContent = pending.length;
  completedCountEl.textContent = completed.length;
  statCompletedTasksEl.textContent = completed.length;
  taskSummaryEl.textContent = `${pending.length} pending`;
  pendingEmptyEl.hidden = pending.length > 0;
  completedEmptyEl.hidden = completed.length > 0;
  clearCompletedBtn.disabled = completed.length === 0;
}

function handleTaskFormSubmit(event) {
  event.preventDefault();

  const text = taskInput.value.trim();
  if (!text) {
    taskError.textContent = 'Please enter a task name before adding it.';
    taskInput.focus();
    return;
  }
  if (text.length > MAX_TASK_LENGTH) {
    taskError.textContent = `Task names can be at most ${MAX_TASK_LENGTH} characters.`;
    taskInput.focus();
    return;
  }

  const priority = taskForm.elements.priority.value;
  addTask(text, priority);
  taskError.textContent = '';
  taskInput.value = '';
  taskInput.focus();
  showToast('Task added to your list.');
}

/* Shared click and change handling for any list built with createListItem. */
function handleListChange(event, onToggle) {
  const checkbox = event.target.closest('.task-checkbox');
  if (!checkbox) return;

  onToggle(checkbox.closest('.task-item').dataset.id, checkbox.checked);
}

function handleListClick(event, onDelete) {
  const deleteButton = event.target.closest('.task-delete');
  if (!deleteButton) return;

  onDelete(deleteButton.closest('.task-item').dataset.id);
}

/* ---------- Study planner ---------- */

function savePlannerItems() {
  writeStorage(STORAGE_KEYS.planner, plannerItems);
  renderPlanner();
}

function addPlannerItem(subject, time) {
  plannerItems.push({
    id: createRecordId(),
    subject,
    time,
    completed: false,
    createdAt: Date.now(),
    completedAt: null,
  });
  savePlannerItems();
}

function setPlannerItemCompleted(id, completed) {
  const item = plannerItems.find((entry) => entry.id === id);
  if (!item) return;

  item.completed = completed;
  item.completedAt = completed ? Date.now() : null;
  savePlannerItems();
}

function deletePlannerItem(id) {
  plannerItems = plannerItems.filter((entry) => entry.id !== id);
  savePlannerItems();
}

function clearDonePlannerItems() {
  plannerItems = plannerItems.filter((entry) => !entry.completed);
  savePlannerItems();
}

function createPlannerElement(entry) {
  const timePill = document.createElement('span');
  timePill.className = 'plan-time';
  timePill.textContent = formatClockTime(entry.time);

  return createListItem({
    id: entry.id,
    text: entry.subject,
    completed: entry.completed,
    meta: timePill,
    deleteLabel: 'Delete study block',
  });
}

function renderPlanner() {
  const upcoming = plannerItems
    .filter((entry) => !entry.completed)
    .sort((a, b) => (a.time || '99:99').localeCompare(b.time || '99:99') || a.createdAt - b.createdAt);
  const done = plannerItems
    .filter((entry) => entry.completed)
    .sort((a, b) => (b.completedAt || 0) - (a.completedAt || 0));

  upcomingList.replaceChildren(...upcoming.map(createPlannerElement));
  doneList.replaceChildren(...done.map(createPlannerElement));

  upcomingCountEl.textContent = upcoming.length;
  doneCountEl.textContent = done.length;
  upcomingEmptyEl.hidden = upcoming.length > 0;
  doneEmptyEl.hidden = done.length > 0;
  clearDoneBtn.disabled = done.length === 0;
}

function handlePlannerFormSubmit(event) {
  event.preventDefault();

  const subject = plannerSubject.value.trim();
  if (!subject) {
    plannerError.textContent = 'Please enter a subject or topic.';
    plannerSubject.focus();
    return;
  }
  if (subject.length > MAX_PLAN_SUBJECT_LENGTH) {
    plannerError.textContent = `Subjects can be at most ${MAX_PLAN_SUBJECT_LENGTH} characters.`;
    plannerSubject.focus();
    return;
  }

  addPlannerItem(subject, plannerTime.value);
  plannerError.textContent = '';
  plannerSubject.value = '';
  plannerTime.value = '';
  plannerSubject.focus();
  showToast('Study block added to your planner.');
}

/* ---------- Live clock, quotes and navigation ---------- */

function getGreeting(hour) {
  if (hour < 12) return 'Good morning, ready to focus?';
  if (hour < 18) return 'Good afternoon, keep the momentum going.';
  return 'Good evening, one more session?';
}

/* Runs every second. It also refreshes the daily stats when the date changes at midnight. */
function updateClock() {
  const now = new Date();
  liveClockEl.textContent = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  liveDateEl.textContent = now.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  greetingEl.textContent = getGreeting(now.getHours());

  if (getTodayKey() !== progressRenderedDay) {
    renderStats();
  }
}

function showNextQuote() {
  let nextIndex;
  do {
    nextIndex = Math.floor(Math.random() * QUOTES.length);
  } while (QUOTES.length > 1 && nextIndex === currentQuoteIndex);

  currentQuoteIndex = nextIndex;
  quoteTextEl.textContent = QUOTES[nextIndex];
  heroQuoteEl.textContent = QUOTES[nextIndex];

  // Restart the fade-in animation for each new quote.
  quoteTextEl.style.animation = 'none';
  void quoteTextEl.offsetWidth;
  quoteTextEl.style.animation = '';
}

function closeNavMenu() {
  mainNav.classList.remove('is-open');
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.setAttribute('aria-label', 'Open menu');
}

function toggleNavMenu() {
  const isOpen = mainNav.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
  navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
}

/* Highlights the nav link for the section currently in the middle of the screen. */
function setupScrollSpy() {
  const navLinks = [...mainNav.querySelectorAll('a[href^="#"]')];
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`);
        });
      });
    },
    { rootMargin: '-45% 0px -50% 0px' },
  );

  sections.forEach((section) => observer.observe(section));
}

function setupRevealAnimations() {
  const items = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window)) {
    items.forEach((item) => item.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.12 },
  );

  items.forEach((item) => observer.observe(item));
}

/* ---------- Settings ---------- */

function openSettings() {
  Object.keys(SETTING_LIMITS).forEach((key) => {
    settingsForm.elements[key].value = settings[key];
  });
  settingsForm.elements.soundEnabled.checked = settings.soundEnabled;
  settingsError.textContent = '';
  settingsDialog.showModal();
}

function closeSettings() {
  settingsDialog.close();
}

function readSettingsForm() {
  const nextSettings = { ...settings };

  for (const [key, { label, min, max }] of Object.entries(SETTING_LIMITS)) {
    const input = settingsForm.elements[key];
    const value = Number(input.value);

    if (!Number.isInteger(value) || value < min || value > max) {
      return { error: `${label} must be a whole number between ${min} and ${max}.`, input };
    }
    nextSettings[key] = value;
  }

  nextSettings.soundEnabled = settingsForm.elements.soundEnabled.checked;
  return { settings: nextSettings };
}

function handleSettingsSubmit(event) {
  event.preventDefault();

  const result = readSettingsForm();
  if (result.error) {
    settingsError.textContent = result.error;
    result.input.focus();
    return;
  }

  settings = result.settings;
  writeStorage(STORAGE_KEYS.settings, settings);
  closeSettings();
  renderStats();

  if (timerState.status === 'idle') {
    switchMode(timerState.mode);
    showToast('Settings saved.');
  } else {
    updateTimerView();
    showToast('Settings saved. New durations apply from your next session.');
  }
}

/* ---------- Notifications ---------- */

function showToast(message) {
  toastEl.textContent = message;
  toastEl.classList.add('is-visible');
  clearTimeout(toastTimerId);
  toastTimerId = setTimeout(() => toastEl.classList.remove('is-visible'), 3500);
}

/* ---------- Keyboard ---------- */

function handleKeydown(event) {
  if (event.code !== 'Space' || event.repeat) return;
  if (document.querySelector('dialog[open]')) return;
  if (event.target.closest('input, textarea, select, button, a, [contenteditable="true"]')) return;

  event.preventDefault();
  toggleStartPause();
}

/* ---------- Initialisation ---------- */

function bindEvents() {
  startBtn.addEventListener('click', startTimer);
  pauseBtn.addEventListener('click', pauseTimer);
  resetBtn.addEventListener('click', resetTimer);
  skipBtn.addEventListener('click', skipSession);

  modeTabs.forEach((tab) => {
    tab.addEventListener('click', () => switchMode(tab.dataset.mode));
  });

  taskForm.addEventListener('submit', handleTaskFormSubmit);
  pendingList.addEventListener('change', (event) => handleListChange(event, setTaskCompleted));
  completedList.addEventListener('change', (event) => handleListChange(event, setTaskCompleted));
  pendingList.addEventListener('click', (event) => handleListClick(event, deleteTask));
  completedList.addEventListener('click', (event) => handleListClick(event, deleteTask));
  clearCompletedBtn.addEventListener('click', clearCompletedTasks);

  plannerForm.addEventListener('submit', handlePlannerFormSubmit);
  upcomingList.addEventListener('change', (event) => handleListChange(event, setPlannerItemCompleted));
  doneList.addEventListener('change', (event) => handleListChange(event, setPlannerItemCompleted));
  upcomingList.addEventListener('click', (event) => handleListClick(event, deletePlannerItem));
  doneList.addEventListener('click', (event) => handleListClick(event, deletePlannerItem));
  clearDoneBtn.addEventListener('click', clearDonePlannerItems);

  ambientButtons.forEach((button) => {
    button.addEventListener('click', handleAmbientClick);
  });

  newQuoteBtn.addEventListener('click', showNextQuote);

  navToggle.addEventListener('click', toggleNavMenu);
  mainNav.addEventListener('click', (event) => {
    if (event.target.closest('a')) closeNavMenu();
  });

  document.getElementById('openSettingsBtn').addEventListener('click', openSettings);
  document.getElementById('closeSettingsBtn').addEventListener('click', closeSettings);
  document.getElementById('cancelSettingsBtn').addEventListener('click', closeSettings);
  settingsForm.addEventListener('submit', handleSettingsSubmit);

  document.addEventListener('keydown', handleKeydown);
}

function init() {
  timerState.remainingMs = getModeDurationMs(timerState.mode);
  ringProgress.style.strokeDasharray = String(RING_CIRCUMFERENCE);
  bindEvents();
  setupScrollSpy();
  setupRevealAnimations();

  updateClock();
  window.setInterval(updateClock, 1000);
  showNextQuote();

  renderAmbientButtons();
  renderStats();
  renderTasks();
  renderPlanner();
  updateTimerView();
}

init();
