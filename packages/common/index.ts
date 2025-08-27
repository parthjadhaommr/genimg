import z from "zod";

export const TrainModel = z.object({
  name: z.string(),
  type: z.enum(["Man", "Woman", "Other"]),
  age: z.string(),
  userId: z.string(),
  ethinicity: z.enum([
    "White",
    "Black",
    "Asian_American",
    "South_East_Asian",
    "South_Asian",
    "Middle_Eastern",
    "Pacific",
    "Hispanic",
  ]),
  eyeColor: z.enum(["Brown", "Blue", "Hazel", "Gray"]),
  bald: z.boolean(),
  images: z.string(),
});

export const GenerateImage = z.object({
  prompt: z.string(),
  userId: z.string(),
  modelId: z.string(),
  imageurl: z.string(),
  num: z.number(),
});

export const GenerateImageFromPack = z.object({
  modelId: z.string(),
  packId: z.string(),
});
