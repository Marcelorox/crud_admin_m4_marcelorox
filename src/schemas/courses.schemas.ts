import { z } from "zod";

const validateCourseRegister = z.object({
  name: z.string().max(50).nonempty(),
  description: z.string().max(120).nonempty(),
});

const validateGetCourses = validateCourseRegister.array();

export { validateCourseRegister, validateGetCourses };
