import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot, Send, Leaf } from "lucide-react";

interface Message {
  id: number;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your environmental learning assistant. Ask me anything about climate change, conservation, sustainability, or any environmental topic!",
      sender: "ai",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");

  const sampleQuestions = [
    "How can I reduce my carbon footprint?",
    "What are the best trees to plant in India?",
    "Explain the greenhouse effect",
    "Tips for water conservation at home"
  ];

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: "user",
      timestamp: new Date()
    };

    const aiResponse: Message = {
      id: messages.length + 2,
      text: "That's a great question! " + getAIResponse(input),
      sender: "ai",
      timestamp: new Date()
    };

    setMessages([...messages, userMessage, aiResponse]);
    setInput("");
  };

  const getAIResponse = (question: string) => {
    const lowerQ = question.toLowerCase();
    if (lowerQ.includes("carbon") || lowerQ.includes("footprint")) {
      return "To reduce your carbon footprint: Use public transport, switch to renewable energy, reduce meat consumption, plant trees, and minimize waste. Start with small changes and track your progress!";
    } else if (lowerQ.includes("tree") || lowerQ.includes("plant")) {
      return "Best trees for India include Neem, Peepal, Banyan, Gulmohar, and Mango. These are native, low-maintenance, and provide excellent shade and air purification. Choose based on your region's climate!";
    } else if (lowerQ.includes("greenhouse")) {
      return "The greenhouse effect is when certain gases (CO2, methane) trap heat in Earth's atmosphere, like a greenhouse. While natural and necessary, excess greenhouse gases from human activities cause global warming.";
    } else if (lowerQ.includes("water")) {
      return "Water conservation tips: Fix leaky taps, install low-flow fixtures, collect rainwater, reuse water when possible, and water plants in morning/evening to reduce evaporation. Every drop counts!";
    }
    return "I understand your question. Environmental issues are complex, and every action counts. Would you like specific information about climate change, conservation methods, or sustainable practices? I'm here to help you learn!";
  };

  const handleSampleQuestion = (question: string) => {
    setInput(question);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Bot className="h-8 w-8 text-primary" />
        <div>
          <h1 className="font-display text-3xl font-bold">AI Environmental Assistant</h1>
          <p className="text-muted-foreground">Get instant answers to your environmental questions</p>
        </div>
      </div>

      <Card className="h-[600px] flex flex-col">
        <CardHeader className="border-b">
          <CardTitle className="text-lg">Chat with AI Assistant</CardTitle>
        </CardHeader>

        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.sender === "user" ? "flex-row-reverse" : ""}`}
            >
              <Avatar className="h-8 w-8 flex-shrink-0">
                <AvatarFallback className={message.sender === "ai" ? "bg-primary/10" : "bg-accent"}>
                  {message.sender === "ai" ? <Leaf className="h-4 w-4 text-primary" /> : "You"}
                </AvatarFallback>
              </Avatar>

              <div
                className={`rounded-md p-3 max-w-[80%] ${
                  message.sender === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
        </CardContent>

        <div className="border-t p-4 space-y-3">
          <div className="flex flex-wrap gap-2">
            {sampleQuestions.map((question, idx) => (
              <Button
                key={idx}
                variant="outline"
                size="sm"
                onClick={() => handleSampleQuestion(question)}
                className="text-xs"
                data-testid={`button-sample-${idx}`}
              >
                {question}
              </Button>
            ))}
          </div>

          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask me anything about the environment..."
              data-testid="input-chat"
            />
            <Button onClick={handleSend} data-testid="button-send">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
