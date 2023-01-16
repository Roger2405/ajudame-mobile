

import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { Layout, FadeIn, FadeOut } from 'react-native-reanimated'
import Colors from '../../../constants/Colors';

// import { styles } from './styles';

interface FeedbackMessageProps {
    setFeedbackMessage: React.Dispatch<React.SetStateAction<{
        type: 'error' | 'info';
        msg: string;
    }>>
    feedbackMessage: {
        type: 'error' | 'info';
        msg: string;
    }
}

export function FeedbackMessage({ feedbackMessage, setFeedbackMessage }: FeedbackMessageProps) {

    setFeedbackMessage(feedbackMessage);
    if (feedbackMessage.msg) {
        setTimeout(() => {
            setFeedbackMessage({} as { type: 'error' | 'info', msg: string });
        }, 5000);
    }

    return (
        <View style={{ width: '100%' }}>
            {
                feedbackMessage.msg && //mensagem de errro
                < Text style={[styles.feedBack, feedbackMessage.type == 'error' ? styles.error : styles.info]}>{feedbackMessage.msg}</Text>
            }
        </View>
    );
}

const styles = StyleSheet.create({

    error: {
        backgroundColor: Colors.lightRed,
        color: Colors.red,
    },
    feedBack: {
        width: '100%',
        textAlign: 'center',
        padding: 8,
        borderRadius: 4,
        marginTop: 4,
    },
    info: {
        backgroundColor: Colors.lightPrimary,
        color: Colors.primary,

    }
})