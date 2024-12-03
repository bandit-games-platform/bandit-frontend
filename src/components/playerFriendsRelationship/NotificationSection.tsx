import {Box, Button} from "@mui/material";
import {useState} from "react";
import ReceivedPendingInvites from "./ReceivedPendingInvites.tsx";
import SentPendingInvites from "./SentPendingInvites.tsx";

export default function NotificationView() {
    const [activeTab, setActiveTab] = useState<'received' | 'sent'>('received');

    const toggleTab = (tab: 'received' | 'sent') => {
        setActiveTab(tab);
    };

    return (
        <Box>
            {/* Tab Navigation */}
            <Box display="flex" justifyContent="center" mb={2}>
                <Button
                    onClick={() => toggleTab('received')}
                    variant="contained"
                    sx={{
                        textTransform: 'none',
                        marginX: 1,
                        backgroundColor: activeTab === 'received' ? 'primary.main' : 'rgba(175,139,139,0.2)',
                        color: activeTab === 'received' ? 'white' : 'text.primary',
                        boxShadow: activeTab === 'received' ? '0px 4px 10px rgba(0, 0, 0, 0.2)' : 'none',
                        border: activeTab === 'received' ? '4px solid rgba(255, 255, 255, 0.5)' : 'none',
                        fontWeight: activeTab === 'received' ? 'bold' : 'normal',
                        '&:hover': {
                            backgroundColor: activeTab === 'received' ? 'primary.dark' : 'rgba(255, 255, 255, 0.3)',
                        },
                    }}
                >
                    Received
                </Button>
                <Button
                    onClick={() => toggleTab('sent')}
                    variant="contained"
                    sx={{
                        textTransform: 'none',
                        marginX: 1,
                        backgroundColor: activeTab === 'sent' ? 'primary.main' : 'rgba(175,139,139,0.2)',
                        color: activeTab === 'sent' ? 'white' : 'text.primary',
                        boxShadow: activeTab === 'sent' ? '0px 4px 10px rgba(0, 0, 0, 0.2)' : 'none',
                        border: activeTab === 'sent' ? '4px solid rgba(255, 255, 255, 0.5)' : 'none',
                        fontWeight: activeTab === 'sent' ? 'bold' : 'normal',
                        '&:hover': {
                            backgroundColor: activeTab === 'sent' ? 'primary.dark' : 'rgba(255, 255, 255, 0.3)',
                        },
                    }}
                >
                    Sent
                </Button>
            </Box>

            {/* Content Based on Active Tab */}
            <Box px={2} py={1}>
                {activeTab === 'received' ? (
                    <ReceivedPendingInvites/>
                ) : (
                    <SentPendingInvites/>
                )}
            </Box>
        </Box>
    );
}
