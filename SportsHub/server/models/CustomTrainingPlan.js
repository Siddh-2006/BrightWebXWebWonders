const mongoose = require('mongoose');

const customTrainingPlanSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    
    planName: {
        type: String,
        required: true,
        trim: true
    },
    
    sport: {
        type: String,
        required: true,
        enum: ['Football', 'Basketball', 'Cricket', 'Tennis', 'Swimming', 'Athletics', 'Golf', 'Baseball', 'Volleyball', 'Badminton', 'Hockey', 'Rugby', 'Boxing', 'Wrestling', 'Cycling', 'Running', 'Weightlifting', 'Yoga', 'Martial Arts', 'General Fitness']
    },
    
    difficulty: {
        type: String,
        required: true,
        enum: ['Beginner', 'Intermediate', 'Advanced', 'Professional']
    },
    
    duration: {
        weeks: {
            type: Number,
            required: true,
            min: 1,
            max: 52
        },
        totalDays: {
            type: Number,
            required: true
        }
    },
    
    sessions: {
        sessionsPerWeek: {
            type: Number,
            required: true,
            min: 1,
            max: 7
        },
        sessionDuration: {
            type: Number, // in minutes
            required: true,
            min: 15,
            max: 180
        },
        totalSessions: {
            type: Number,
            required: true
        }
    },
    
    goals: [{
        type: String,
        trim: true
    }],
    
    focusAreas: [{
        type: String,
        enum: ['Strength', 'Endurance', 'Speed', 'Agility', 'Flexibility', 'Balance', 'Coordination', 'Power', 'Technique', 'Mental Training', 'Recovery', 'Nutrition']
    }],
    
    equipment: [{
        name: String,
        required: {
            type: Boolean,
            default: false
        }
    }],
    
    customNotes: {
        type: String,
        trim: true
    },
    
    generatedPlan: {
        planTitle: String,
        overview: String,
        weeklyStructure: {
            sessionsPerWeek: Number,
            totalWeeks: Number,
            restDays: Number
        },
        sessionDetails: [{
            sessionNumber: Number,
            title: String,
            duration: String,
            focus: String,
            warmUp: [String],
            mainWorkout: [String],
            coolDown: [String]
        }],
        progression: mongoose.Schema.Types.Mixed,
        equipment: [String],
        safetyGuidelines: [String],
        nutritionTips: [String],
        recoveryGuidelines: [String],
        additionalNotes: String
    },
    
    isActive: {
        type: Boolean,
        default: true
    },
    
    progress: {
        completedSessions: {
            type: Number,
            default: 0
        },
        completedWeeks: {
            type: Number,
            default: 0
        },
        lastSessionDate: Date,
        sessionHistory: [{
            sessionNumber: Number,
            completedDate: Date,
            notes: String,
            rating: {
                type: Number,
                min: 1,
                max: 5
            }
        }]
    },
    
    isPublic: {
        type: Boolean,
        default: false
    },
    
    likes: {
        type: Number,
        default: 0
    },
    
    likedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }],
    
    tags: [String]
    
}, { timestamps: true });

// Index for better query performance
customTrainingPlanSchema.index({ userId: 1, sport: 1 });
customTrainingPlanSchema.index({ sport: 1, difficulty: 1 });
customTrainingPlanSchema.index({ isPublic: 1, likes: -1 });

module.exports = mongoose.model('CustomTrainingPlan', customTrainingPlanSchema);