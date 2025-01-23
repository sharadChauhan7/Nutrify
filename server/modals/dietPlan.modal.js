import mongoose from "mongoose"
const Schema = mongoose.Schema;


const dietPlanSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,ref: 'User'
    },
    breakfast: [
        {
            name: {
                type: String,
                default: "",
                required: true
            },
            image: {
                type: String,
                default: "",
                required: true
            },
            nutrition: {
                calories: {
                    type: Number,
                    default: null,
                    required: true
                },
                protein: {
                    type: String,
                    default: "",
                    required: true
                },
                carbs: {
                    type: String,
                    default: "",
                    required: true
                },
                fats: {
                    type: String,
                    default: "",
                    required: true
                }
            },
            portionSize: {
                type: String,
                default: "",
                required: true
            },
            recipe: {
                type: String,
                default: "",
                required: true
            },
            ingredients: {
                type: [String],
                default: [],
                required: true
            }
        }
    ],
    lunch: [
        {
            name: {
                type: String,
                default: "",
                required: true
            },
            image: {
                type: String,
                default: "",
                required: true
            },
            nutrition: {
                calories: {
                    type: Number,
                    default: null,
                    required: true
                },
                protein: {
                    type: String,
                    default: "",
                    required: true
                },
                carbs: {
                    type: String,
                    default: "",
                    required: true
                },
                fats: {
                    type: String,
                    default: "",
                    required: true
                }
            },
            portionSize: {
                type: String,
                default: "",
                required: true
            },
            recipe: {
                type: String,
                default: "",
                required: true
            },
            ingredients: {
                type: [String],
                default: [],
                required: true
            }
        }
    ],
    snacks: [
        {
            name: {
                type: String,
                default: "",
                required: true
            },
            image: {
                type: String,
                default: "",
                required: true
            },
            nutrition: {
                calories: {
                    type: Number,
                    default: null,
                    required: true
                },
                protein: {
                    type: String,
                    default: "",
                    required: true
                },
                carbs: {
                    type: String,
                    default: "",
                    required: true
                },
                fats: {
                    type: String,
                    default: "",
                    required: true
                }
            },
            portionSize: {
                type: String,
                default: "",
                required: true
            },
            recipe: {
                type: String,
                default: "",
                required: true
            },
            ingredients: {
                type: [String],
                default: [],
                required: true
            }
        }
    ],
    dinner: [
        {
            name: {
                type: String,
                default: "",
                required: true
            },
            image: {
                type: String,
                default: "",
                required: true
            },
            nutrition: {
                calories: {
                    type: Number,
                    default: null,
                    required: true
                },
                protein: {
                    type: String,
                    default: "",
                    required: true
                },
                carbs: {
                    type: String,
                    default: "",
                    required: true
                },
                fats: {
                    type: String,
                    default: "",
                    required: true
                }
            },
            portionSize: {
                type: String,
                default: "",
                required: true
            },
            recipe: {
                type: String,
                default: "",
                required: true
            },
            ingredients: {
                type: [String],
                default: [],
                required: true
            }
        }
    ]
});

export default mongoose.model('DietPlan', dietPlanSchema);