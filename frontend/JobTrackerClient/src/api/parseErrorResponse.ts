type ValidationErrorResponse = {
  errors: { [key: string]: string[] };
};

type ProblemDetailsResponse = {
  title?: string;
  detail?: string;
};

type MessageResponse = {
  message?: string;
};

export const parseErrorResponse = async (res: Response): Promise<string> => {
  try {
    const errData: unknown = await res.json();

    const validationMessage = parseValidationErrors(errData);
    if (validationMessage) return validationMessage;

    const problemDetailsMessage = parseProblemDetails(errData);
    if (problemDetailsMessage) return problemDetailsMessage;

    const plainMessage = parsePlainMessage(errData);
    if (plainMessage) return plainMessage;

    return "Unknown error occurred.";
  } catch {
    return "Unexpected error response from server.";
  }
};

const parseValidationErrors = (data: unknown): string | null => {
  if (
    typeof data === "object" &&
    data !== null &&
    "errors" in data &&
    typeof (data as ValidationErrorResponse).errors === "object"
  ) {
    const errorsObj = (data as ValidationErrorResponse).errors;
    const allErrors = Object.values(errorsObj).flat();
    if (allErrors.length > 0) {
      return allErrors.join(" ");
    }
  }
  return null;
};

const parseProblemDetails = (data: unknown): string | null => {
  if (typeof data === "object" && data !== null) {
    const { title, detail } = data as ProblemDetailsResponse;
    if (title || detail) {
      return `${title ?? ""}${detail ? `: ${detail}` : ""}`.trim();
    }
  }
  return null;
};

const parsePlainMessage = (data: unknown): string | null => {
  if (
    typeof data === "object" &&
    data !== null &&
    "message" in data &&
    typeof (data as MessageResponse).message === "string"
  ) {
    return (data as MessageResponse).message!;
  }
  return null;
};
