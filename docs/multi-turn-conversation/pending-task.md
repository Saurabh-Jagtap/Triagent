## Pending Task

interface PendingTask {

    intent

    status

    originalRequest

    collected

    missing

    createdAt

    updatedAt

}

The task acts as temporary memory for the assistant.

Example

{

    intent: "gmail",

    collected: {

        recipientEmail,

        subject,

        body

    },

    missing: [],

    originalRequest:
    "Send an email to Abhishek"

}