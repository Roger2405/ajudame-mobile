

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { Layout, FadeIn, FadeOut, FadeOutUp, FadeInDown, FadeInUp, FadeOutDown } from 'react-native-reanimated'
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

    useEffect(() => {
        setFeedbackMessage(feedbackMessage);
        if (feedbackMessage.msg) {
            setTimeout(() => {
                setFeedbackMessage({} as { type: 'error' | 'info', msg: string });
            }, 50000);
        }
    }, [feedbackMessage])

    return (
        <Animated.View layout={Layout} entering={FadeInUp} exiting={FadeOutDown} style={{ width: '100%', marginVertical: 4 }}>
            {
                feedbackMessage.msg && //mensagem de errro
                < Text style={[styles.feedBack, feedbackMessage.type == 'error' ? styles.error : styles.info]}>{feedbackMessage.msg}</Text>
            }
        </Animated.View>
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
        top: 0,
        position: 'absolute',
        zIndex: 1000,
        height: 80
    },
    info: {
        backgroundColor: Colors.lightPrimary,
        color: Colors.primary,

    }
})