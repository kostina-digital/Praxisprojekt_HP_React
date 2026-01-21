import { Accordion, Stack, Heading, Box } from "@chakra-ui/react"
import FAQsData from './FAQsData.json'


export default function FAQsSection() {
  if (!FAQsData || FAQsData.length === 0) {
    return <div>No FAQs available</div>
  }

  return (
    <Stack gap="4" width="100%">
      <div className="flex flex-col gap-2 mb-4">
        <h2 className="h2_style">Frequently Asked Questions</h2>
        <p className="text-gray-600 text-lg">Here are some of the most frequently asked questions about our website and services.</p>
      </div>
      <Accordion.Root collapsible>
        {FAQsData.map((item, index) => (
          <Accordion.Item key={`faq-${index}`} value={`faq-item-${index}`}>
            <Accordion.ItemTrigger>
              <Box flex="1" textAlign="left" fontWeight="medium">
                {item.question}
              </Box>
              <Accordion.ItemIndicator />
            </Accordion.ItemTrigger>
            <Accordion.ItemContent>
              <Accordion.ItemBody px={4} py={3}>
                {item.answer}
              </Accordion.ItemBody>
            </Accordion.ItemContent>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </Stack>
  )
}
