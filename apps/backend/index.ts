import { GenerateImage, GenerateImageFromPack, TrainModel } from "common/types";
import { prismaClient } from "db";
import express from "express";

const USERId = "lkjdflkjklsejlkscjkl";
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json);

app.post("/ai/training", async (req, res) => {
  const parsedBody = TrainModel.safeParse(req.body);

  if (!parsedBody.success) {
    res.status(411).json({
      message: "Input incorrect",
    });
    return;
  }
  const data = await prismaClient.model.create({
    data: {
      name: parsedBody.data.name,
      type: parsedBody.data.type,
      age: parsedBody.data.age,
      ethnicity: parsedBody.data.ethinicity,
      eyeColor: parsedBody.data.eyeColor,
      bald: parsedBody.data.bald,
      userId: USERId,
      image: parsedBody.data.images, // Todo : remove this
    },
  });
  res.json({
    modelId: data.id,
  });
});

app.post("/ai/generate", async (req, res) => {
  const parsedBody = GenerateImage.safeParse(req.body);

  if (!parsedBody.success) {
    res.status(411).json({
      message: "Input incorrect",
    });
    return;
  }

  const data = await prismaClient.outputImages.create({
    data: {
      prompt: parsedBody.data.prompt,
      userId: USERId,
      modelId: parsedBody.data.modelId,
      imageUrl: "",
    },
  });

  res.json({
    imageId: data.id,
  });
});

app.post("/packs/generate", async (req, res) => {
  const parsedBody = GenerateImageFromPack.safeParse(req.body);

  if (!parsedBody.success) {
    res.status(411).json({
      message: "Input Incorrect",
    });
  }

  const prompts = await prismaClient.packPrompts.findMany({
    where: {
      packsId: parsedBody.data?.packId,
    },
  });

  const image = await prismaClient.outputImages.createManyAndReturn({
    data: prompts.map((prompt: any) => ({
      prompt: prompt.prompt,
      userId: prompt.userId,
      modelId: prompt.modelId,
      imageurl: prompt.imageurl,
    })),
  });

  res.json({
    images: image.map(image => image.id),
  });
});

app.get("/pack/bulk", async (req, res) => {
  const pack = await prismaClient.packs.findMany({});
  res.json({
    pack,
  });
});

app.get("/image/bulk", async (req, res) => {
  const ids = req.query.images as string[];
  const limit = (req.query.limit as string) ?? "10";
  const offset = (req.query.offset as string) ?? "0";

  const imageData = await prismaClient.outputImages.findMany({
    where: {
      id: { in: ids },
      userId: USERId,
    },
    skip: Number.parseInt(offset),
    take: Number.parseInt(limit),
  });

  res.json({
    imageData,
  });
});

app.listen(PORT, () => {
  console.log("Server running on port : ", PORT);
});
