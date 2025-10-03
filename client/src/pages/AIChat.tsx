import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot, Send, Leaf } from "lucide-react";
import { Header } from "@/components/Header";

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
      text: "Hello! I'm your environmental learning assistant. Ask me anything about climate change, conservation, sustainability, pollution, renewable energy, or any current environmental topic!",
      sender: "ai",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");

  const sampleQuestions = [
    "What is air pollution in Delhi?",
    "How does plastic affect oceans?",
    "What is renewable energy?",
    "Tell me about climate change",
    "Water scarcity in India",
    "How to compost at home?"
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
      text: getAIResponse(input),
      sender: "ai",
      timestamp: new Date()
    };

    setMessages([...messages, userMessage, aiResponse]);
    setInput("");
  };

  const getAIResponse = (question: string) => {
    const lowerQ = question.toLowerCase();

    if (lowerQ.includes("air pollution") || lowerQ.includes("air quality") || lowerQ.includes("delhi")) {
      return "Air pollution in Delhi is a critical issue, especially during winter. Main causes include vehicle emissions, industrial pollution, crop burning, and dust. Solutions: Use public transport, plant trees, support clean energy, wear masks during high pollution days, and advocate for stricter emission norms. AQI (Air Quality Index) monitoring helps track pollution levels.";
    } 
    
    if (lowerQ.includes("plastic") || lowerQ.includes("ocean")) {
      return "Plastic pollution severely impacts oceans - harming marine life, entering food chains, and breaking down into microplastics. 8 million tons of plastic enter oceans yearly! Solutions: Reduce single-use plastics, use reusable bags and bottles, participate in beach cleanups, support plastic bans, and choose products with minimal packaging.";
    }
    
    if (lowerQ.includes("climate change") || lowerQ.includes("global warming")) {
      return "Climate change is the long-term shift in Earth's temperature and weather patterns, mainly caused by human activities like burning fossil fuels, deforestation, and industrial emissions. Effects include rising temperatures, melting glaciers, extreme weather, and sea-level rise. Act now: reduce energy use, support renewable energy, plant trees, and make sustainable choices!";
    }
    
    if (lowerQ.includes("renewable energy") || lowerQ.includes("solar") || lowerQ.includes("wind energy")) {
      return "Renewable energy comes from natural sources that replenish constantly - solar, wind, hydro, geothermal, and biomass. India is a leader in solar energy! Benefits: Clean, sustainable, reduces carbon emissions, and creates jobs. You can help by installing solar panels, supporting renewable energy policies, and reducing energy consumption.";
    }
    
    if (lowerQ.includes("water") || lowerQ.includes("scarcity") || lowerQ.includes("conservation")) {
      return "Water scarcity is a growing crisis in India, affecting millions. Causes: population growth, climate change, pollution, and wasteful practices. Solutions: Harvest rainwater, fix leaks, use drip irrigation, recycle water, take shorter showers, and avoid water wastage. Remember: Only 1% of Earth's water is accessible freshwater!";
    }
    
    if (lowerQ.includes("deforestation") || lowerQ.includes("forest")) {
      return "Deforestation - clearing forests for agriculture, urbanization, or logging - destroys habitats, increases CO2, and disrupts ecosystems. India loses forest cover annually. Solutions: Plant native trees, support afforestation programs, use recycled paper, choose sustainable wood products, and protect existing forests. Trees are Earth's lungs!";
    }
    
    if (lowerQ.includes("carbon") || lowerQ.includes("footprint")) {
      return "Your carbon footprint is the total greenhouse gas emissions caused by your actions. Reduce it by: using public transport or cycling, eating less meat, switching to renewable energy, reducing waste, buying local products, and planting trees. Small changes add up - track your progress and inspire others!";
    } 
    
    if (lowerQ.includes("tree") || lowerQ.includes("plant")) {
      return "Trees are vital for clean air, water, and biodiversity! Best trees for India: Neem (medicinal), Peepal (sacred, oxygen-rich), Banyan (massive shade), Gulmohar (beautiful), Mango (fruit-bearing), and Jamun. Choose native species suited to your climate. One tree can absorb 22kg of CO2 annually. Start planting today!";
    } 
    
    if (lowerQ.includes("greenhouse") || lowerQ.includes("gas")) {
      return "Greenhouse gases (CO2, methane, nitrous oxide) trap heat in Earth's atmosphere like a greenhouse. While natural and necessary for life, excess GHGs from human activities cause global warming. Main sources: fossil fuels, agriculture, deforestation, and industry. Reduce emissions through clean energy, sustainable practices, and conservation!";
    }
    
    if (lowerQ.includes("compost") || lowerQ.includes("organic") || lowerQ.includes("waste")) {
      return "Composting turns organic waste into nutrient-rich soil! How to start: Collect kitchen scraps (fruit peels, vegetable waste, coffee grounds), add brown materials (dry leaves, paper), keep it moist, turn regularly, and wait 2-3 months. Benefits: Reduces landfill waste, enriches soil, and reduces methane emissions. Great for home gardens!";
    }
    
    if (lowerQ.includes("biodiversity") || lowerQ.includes("species") || lowerQ.includes("extinction")) {
      return "Biodiversity - the variety of life on Earth - is crucial for ecosystem health. India is a biodiversity hotspot but faces threats from habitat loss, pollution, and climate change. Protect it by: preserving habitats, supporting wildlife sanctuaries, avoiding wildlife products, planting native species, and spreading awareness. Every species matters!";
    }
    
    if (lowerQ.includes("electric vehicle") || lowerQ.includes("ev") || lowerQ.includes("transport")) {
      return "Electric vehicles (EVs) are the future of sustainable transport! They produce zero tailpipe emissions, are energy-efficient, and reduce air pollution. India is promoting EV adoption with subsidies and charging infrastructure. Support clean mobility by choosing EVs, using public transport, cycling, or carpooling. Drive change!";
    }
    
    if (lowerQ.includes("recycling") || lowerQ.includes("recycle")) {
      return "Recycling reduces waste, conserves resources, and saves energy! What to recycle: paper, cardboard, glass, metals, and certain plastics. Tips: Separate waste at source, clean items before recycling, follow local guidelines, and reduce consumption. Remember the 3Rs: Reduce, Reuse, Recycle - in that order!";
    }
    
    if (lowerQ.includes("pollution") || lowerQ.includes("contamination")) {
      return "Pollution - air, water, soil, noise, or plastic - harms health and ecosystems. Major causes: industrial emissions, vehicle exhaust, improper waste disposal, and agricultural runoff. Solutions: Support clean technologies, reduce waste, use eco-friendly products, plant trees, and advocate for stronger environmental regulations. Clean environment = healthy life!";
    }
    
    if (lowerQ.includes("sustainable") || lowerQ.includes("sustainability")) {
      return "Sustainability means meeting present needs without compromising future generations. Practice sustainable living by: reducing consumption, choosing eco-friendly products, supporting local businesses, conserving energy and water, minimizing waste, and making informed choices. Every action counts - be the change!";
    }
    
    if (lowerQ.includes("ozone") || lowerQ.includes("layer")) {
      return "The ozone layer protects Earth from harmful UV radiation. CFCs (from old refrigerators and aerosols) damaged it, creating the 'ozone hole.' The Montreal Protocol successfully reduced CFCs! Protect the ozone by: avoiding ozone-depleting substances, properly disposing of old appliances, and supporting international environmental agreements.";
    }
    
    if (lowerQ.includes("energy") || lowerQ.includes("save") || lowerQ.includes("electricity")) {
      return "Energy conservation reduces bills and emissions! Tips: Use LED bulbs, unplug devices when not in use, optimize AC temperature (24-25°C), use natural light, choose energy-efficient appliances (5-star rated), and insulate your home. India's Energy Conservation Act promotes efficiency. Save energy, save the planet!";
    }
    
    if (lowerQ.includes("reduce") || lowerQ.includes("minimize")) {
      return "Reducing consumption is the most effective environmental action! Start by: refusing single-use items, buying only what you need, choosing quality over quantity, repairing instead of replacing, sharing resources, and supporting circular economy. Minimalism = less waste + more sustainability!";
    }

    if (lowerQ.includes("hello") || lowerQ.includes("hi") || lowerQ.includes("namaste")) {
      return "Namaste! 🙏 I'm here to help you learn about environmental topics. Ask me about climate change, pollution, renewable energy, conservation, or any environmental issue affecting India and the world. What would you like to know?";
    }

    if (lowerQ.includes("thank") || lowerQ.includes("thanks")) {
      return "You're welcome! Keep learning and taking action for our environment. Every small step makes a difference. Feel free to ask more questions anytime! 🌱";
    }

    return "That's an interesting question about the environment! While I don't have specific information on that exact topic, I can help you with: climate change, air/water pollution, renewable energy, waste management, conservation, biodiversity, sustainable living, and current environmental issues in India. What specific aspect would you like to explore?";
  };

  const handleSampleQuestion = (question: string) => {
    setInput(question);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 py-8">
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
                data-testid={`message-${message.id}`}
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
      </main>
    </div>
  );
}
