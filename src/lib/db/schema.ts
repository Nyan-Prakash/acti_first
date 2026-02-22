import { pgTable, uuid, text, timestamp, integer, jsonb, pgEnum } from "drizzle-orm/pg-core";

export const gradeLevelEnum = pgEnum("grade_level", ["primary", "middle_school", "high_school"]);
export const activityTypeEnum = pgEnum("activity_type", ["educational", "assessment"]);
export const generationStatusEnum = pgEnum("generation_status", ["pending", "streaming", "completed", "failed"]);

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name"),
  passwordHash: text("password_hash"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const generationRequests = pgTable("generation_requests", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  gradeLevel: gradeLevelEnum("grade_level").notNull(),
  subject: text("subject").notNull(),
  activityType: activityTypeEnum("activity_type").notNull(),
  lessonInfo: text("lesson_info").notNull(),
  learningObjectives: text("learning_objectives").notNull(),
  status: generationStatusEnum("status").default("pending").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const activities = pgTable("activities", {
  id: uuid("id").defaultRandom().primaryKey(),
  generationRequestId: uuid("generation_request_id")
    .references(() => generationRequests.id, { onDelete: "cascade" })
    .notNull(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  title: text("title").notNull(),
  category: text("category").notNull(),
  summary: text("summary").notNull(),
  content: jsonb("content").notNull(),
  isSaved: integer("is_saved").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const ratings = pgTable("ratings", {
  id: uuid("id").defaultRandom().primaryKey(),
  activityId: uuid("activity_id").references(() => activities.id, { onDelete: "cascade" }).notNull(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  suitability: integer("suitability").notNull(),
  goalAchievement: integer("goal_achievement").notNull(),
  recommendation: integer("recommendation").notNull(),
  comment: text("comment"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
