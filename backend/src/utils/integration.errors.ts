export class IntegrationNotConnectedError extends Error {
    constructor(
        public readonly integration: "googlecalendar" | "gmail",
    ) {
        super(`${integration} is not connected.`);
        this.name = "IntegrationNotConnectedError";
    }
}