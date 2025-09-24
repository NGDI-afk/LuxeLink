// Messages component for chat functionality
import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Paperclip, Lock, Eye, MoreVertical } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  sender_id: string;
  sender_name: string;
  sender_avatar?: string;
  content: string;
  media_url?: string;
  media_type?: 'image' | 'video' | 'audio';
  ppv_price?: number;
  is_locked: boolean;
  is_read: boolean;
  created_at: string;
}

interface Conversation {
  id: string;
  participant_id: string;
  participant_name: string;
  participant_avatar?: string;
  participant_role: 'fan' | 'creator';
  last_message: string;
  last_message_time: string;
  unread_count: number;
  is_online: boolean;
}

const Messages = () => {
  const { toast } = useToast();
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [ppvPrice, setPpvPrice] = useState<number | null>(null);
  const [showPpvInput, setShowPpvInput] = useState(false);

  // Mock data - En producción esto vendría de Supabase
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: '1',
      participant_id: 'user1',
      participant_name: 'Emma Rodriguez',
      participant_avatar: '/placeholder.svg',
      participant_role: 'fan',
      last_message: 'Hey! Love your content ❤️',
      last_message_time: '2 min ago',
      unread_count: 2,
      is_online: true
    },
    {
      id: '2',
      participant_id: 'user2',
      participant_name: 'Alex Johnson',
      participant_avatar: '/placeholder.svg',
      participant_role: 'creator',
      last_message: 'Thanks for the collaboration!',
      last_message_time: '1 hour ago',
      unread_count: 0,
      is_online: false
    }
  ]);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender_id: 'user1',
      sender_name: 'Emma Rodriguez',
      sender_avatar: '/placeholder.svg',
      content: 'Hey! Love your content ❤️',
      is_locked: false,
      is_read: true,
      created_at: '2024-01-15T10:30:00Z'
    },
    {
      id: '2',
      sender_id: 'current_user',
      sender_name: 'You',
      content: 'Thank you so much! 💕',
      is_locked: false,
      is_read: true,
      created_at: '2024-01-15T10:35:00Z'
    },
    {
      id: '3',
      sender_id: 'current_user',
      sender_name: 'You',
      content: 'Check out this exclusive photo! 📸',
      media_url: '/placeholder.svg',
      media_type: 'image',
      ppv_price: 15,
      is_locked: true,
      is_read: false,
      created_at: '2024-01-15T10:40:00Z'
    }
  ]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() && !ppvPrice) return;

    const messageData: Omit<Message, 'id'> = {
      sender_id: 'current_user',
      sender_name: 'You',
      content: newMessage,
      ppv_price: ppvPrice || undefined,
      is_locked: ppvPrice ? true : false,
      is_read: false,
      created_at: new Date().toISOString()
    };

    // Aquí enviarías el mensaje a Supabase
    console.log('Sending message:', messageData);
    
    setMessages(prev => [...prev, { ...messageData, id: Date.now().toString() }]);
    setNewMessage('');
    setPpvPrice(null);
    setShowPpvInput(false);

    toast({
      title: ppvPrice ? "PPV Message Sent" : "Message Sent",
      description: ppvPrice ? `PPV price: $${ppvPrice}` : "Your message has been delivered"
    });
  };

  const handleUnlockMessage = async (messageId: string) => {
    const message = messages.find(m => m.id === messageId);
    if (message?.ppv_price) {
      // Aquí procesarías el pago
      toast({
        title: "Processing Payment",
        description: `Unlocking message for $${message.ppv_price}`
      });
      
      setMessages(prev => prev.map(m => 
        m.id === messageId ? { ...m, is_locked: false } : m
      ));
    }
  };

  const selectedConversationData = conversations.find(c => c.id === selectedConversation);
  const conversationMessages = selectedConversation ? messages : [];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto p-6 pt-24">
        <div className="grid lg:grid-cols-3 gap-6 h-[800px]">
          {/* Conversations List */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Messages
                <Badge variant="secondary">{conversations.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[700px]">
                {conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`p-4 cursor-pointer hover:bg-muted/50 border-b transition-colors ${
                      selectedConversation === conversation.id ? 'bg-muted' : ''
                    }`}
                    onClick={() => setSelectedConversation(conversation.id)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="relative">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={conversation.participant_avatar} />
                          <AvatarFallback>
                            {conversation.participant_name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        {conversation.is_online && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background" />
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-sm truncate">
                            {conversation.participant_name}
                          </h3>
                          <span className="text-xs text-muted-foreground">
                            {conversation.last_message_time}
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between mt-1">
                          <p className="text-sm text-muted-foreground truncate">
                            {conversation.last_message}
                          </p>
                          {conversation.unread_count > 0 && (
                            <Badge variant="destructive" className="h-5 w-5 p-0 text-xs">
                              {conversation.unread_count}
                            </Badge>
                          )}
                        </div>
                        
                        <Badge 
                          variant={conversation.participant_role === 'creator' ? 'default' : 'secondary'}
                          className="mt-2 text-xs"
                        >
                          {conversation.participant_role}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Chat Area */}
          <Card className="lg:col-span-2">
            {selectedConversationData ? (
              <>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={selectedConversationData.participant_avatar} />
                        <AvatarFallback>
                          {selectedConversationData.participant_name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{selectedConversationData.participant_name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {selectedConversationData.is_online ? 'Online now' : 'Last seen recently'}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                
                <Separator />
                
                <CardContent className="p-0">
                  {/* Messages */}
                  <ScrollArea className="h-[500px] p-4">
                    <div className="space-y-4">
                      {conversationMessages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.sender_id === 'current_user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`max-w-[70%] ${message.sender_id === 'current_user' ? 'order-2' : ''}`}>
                            <div
                              className={`rounded-lg p-3 ${
                                message.sender_id === 'current_user'
                                  ? 'bg-primary text-primary-foreground'
                                  : 'bg-muted'
                              }`}
                            >
                              {message.is_locked && message.ppv_price ? (
                                <div className="text-center">
                                  <Lock className="h-8 w-8 mx-auto mb-2 opacity-50" />
                                  <p className="text-sm font-medium">Locked Content</p>
                                  <p className="text-xs opacity-75 mb-3">
                                    Unlock for ${message.ppv_price}
                                  </p>
                                  {message.sender_id !== 'current_user' && (
                                    <Button
                                      size="sm"
                                      variant="secondary"
                                      onClick={() => handleUnlockMessage(message.id)}
                                    >
                                      Unlock Message
                                    </Button>
                                  )}
                                </div>
                              ) : (
                                <>
                                  {message.content && <p className="text-sm">{message.content}</p>}
                                  {message.media_url && (
                                    <div className="mt-2">
                                      <img
                                        src={message.media_url}
                                        alt="Message media"
                                        className="rounded max-w-full h-auto"
                                      />
                                    </div>
                                  )}
                                </>
                              )}
                            </div>
                            
                            <div className="flex items-center justify-between mt-1 px-1">
                              <span className="text-xs text-muted-foreground">
                                {new Date(message.created_at).toLocaleTimeString()}
                              </span>
                              {message.sender_id === 'current_user' && (
                                <div className="flex items-center space-x-1">
                                  {message.ppv_price && (
                                    <span className="text-xs text-muted-foreground">
                                      ${message.ppv_price}
                                    </span>
                                  )}
                                  <Eye className={`h-3 w-3 ${message.is_read ? 'text-primary' : 'text-muted-foreground'}`} />
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  
                  <Separator />
                  
                  {/* Message Input */}
                  <div className="p-4">
                    {showPpvInput && (
                      <div className="mb-3 p-3 bg-muted rounded-lg">
                        <label className="text-sm font-medium">PPV Price (USD)</label>
                        <Input
                          type="number"
                          placeholder="0.00"
                          value={ppvPrice || ''}
                          onChange={(e) => setPpvPrice(Number(e.target.value) || null)}
                          className="mt-1"
                        />
                      </div>
                    )}
                    
                    <div className="flex items-end space-x-2">
                      <div className="flex-1">
                        <Input
                          placeholder="Type your message..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                          className="resize-none"
                        />
                      </div>
                      
                      <div className="flex space-x-1">
                        <Button variant="outline" size="sm">
                          <Paperclip className="h-4 w-4" />
                        </Button>
                        
                        <Button
                          variant={showPpvInput ? "default" : "outline"}
                          size="sm"
                          onClick={() => setShowPpvInput(!showPpvInput)}
                        >
                          <Lock className="h-4 w-4" />
                        </Button>
                        
                        <Button onClick={handleSendMessage} size="sm">
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </>
            ) : (
              <CardContent className="flex items-center justify-center h-full">
                <div className="text-center">
                  <h3 className="font-semibold text-lg mb-2">Select a conversation</h3>
                  <p className="text-muted-foreground">
                    Choose a conversation from the left to start messaging
                  </p>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Messages;