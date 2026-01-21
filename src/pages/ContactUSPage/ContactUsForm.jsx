import { Button, Field, Input, Stack } from "@chakra-ui/react"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"

export default function ContactUsForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = handleSubmit((data) => console.log(data))

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 mb-4">
        <h2 className="h2_style">Send Us a Message</h2>
        <p className="text-gray-600 text-sm md:text-base lg:text-lg">Please fill in the form below to get in touch with us.</p>
      </div>
      
      <form onSubmit={onSubmit}>
        <Stack gap="4" align="flex-start" maxW="2xl">
          {/* First row: First name and Last name */}
          <div className="flex gap-4 w-full">
            <Field.Root invalid={!!errors.firstName} className="flex-1">
              <Field.Label>First name</Field.Label>
              <Input
                placeholder="First name"
                border="1px solid"
                borderColor="gray.300"
                px={3}
                py={2}
                _focus={{ borderColor: "#646cff", boxShadow: "0 0 0 1px #646cff" }}
                {...register("firstName", { required: "First name is required" })}
              />
              <Field.ErrorText>{errors.firstName?.message}</Field.ErrorText>
            </Field.Root>
            
            <Field.Root invalid={!!errors.lastName} className="flex-1">
              <Field.Label>Last name</Field.Label>
              <Input
                placeholder="Last name"
                border="1px solid"
                borderColor="gray.300"
                px={3}
                py={2}
                _focus={{ borderColor: "#646cff", boxShadow: "0 0 0 1px #646cff" }}
                {...register("lastName", { required: "Last name is required" })}
              />
              <Field.ErrorText>{errors.lastName?.message}</Field.ErrorText>
            </Field.Root>
          </div>

          {/* Second row: Email and Phone */}
          <div className="flex gap-4 w-full">
            <Field.Root invalid={!!errors.email} className="flex-1">
              <Field.Label>Email address</Field.Label>
              <Input 
                type="email"
                placeholder="Email address"
                border="1px solid"
                borderColor="gray.300"
                px={3}
                py={2}
                _focus={{ borderColor: "#646cff", boxShadow: "0 0 0 1px #646cff" }}
                {...register("email", { 
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
              />
              <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
            </Field.Root>
            
            <Field.Root invalid={!!errors.phone} className="flex-1">
              <Field.Label>Phone Number</Field.Label>
              <Input
                type="tel"
                placeholder="Phone Number"
                border="1px solid"
                borderColor="gray.300"
                px={3}
                py={2}
                _focus={{ borderColor: "#646cff", boxShadow: "0 0 0 1px #646cff" }}
                {...register("phone")}
              />
              <Field.ErrorText>{errors.phone?.message}</Field.ErrorText>
            </Field.Root>
          </div>

          {/* Message field - full width */}
          <Field.Root invalid={!!errors.message} width="100%">
            <Field.Label>Message</Field.Label>
            <textarea
              placeholder="Message"
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#646cff] focus:border-transparent resize-vertical"
              {...register("message", { required: "Message is required" })}
            />
            <Field.ErrorText>{errors.message?.message}</Field.ErrorText>
          </Field.Root>

          {/* Checkbox with Terms and Privacy Policy */}
          <Field.Root invalid={!!errors.agreeToTerms} width="100%">
            <Field.Label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  {...register("agreeToTerms", { required: "You must agree to the terms" })}
                  className="w-4 h-4"
                />
                <span>
                  I've read and agree with{' '}
                  <Link to="/terms-of-service" className="underline text-[#646cff] hover:text-[#535bf2]">
                    Terms of Service
                  </Link>
                  {' '}and{' '}
                  <Link to="/privacy-policy" className="underline text-[#646cff] hover:text-[#535bf2]">
                    Privacy Policy
                  </Link>
                  .
                </span>
              </label>
            </Field.Label>
            {errors.agreeToTerms && (
              <Field.ErrorText>{errors.agreeToTerms.message}</Field.ErrorText>
            )}
          </Field.Root>

          {/* Submit button */}
          <Button 
            className="bg-[#646cff] text-white hover:bg-[#535bf2] hover:text-white mx-auto block" 
            type="submit" 
            width="100%" 
            maxW="200px"
          >
            Submit
          </Button>
        </Stack>
      </form>
    </div>
  )
}
