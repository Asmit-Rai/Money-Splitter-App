import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Switch } from 'react-native';

const SettingsScreen = () => {
    const [notificationsEnabled, setNotificationsEnabled] = useState(false);
    const [darkThemeEnabled, setDarkThemeEnabled] = useState(false);

    const handleNotificationsToggle = () => {
        setNotificationsEnabled(!notificationsEnabled);
    };

    const handleThemeToggle = () => {
        setDarkThemeEnabled(!darkThemeEnabled);
    };

    const handleLogout = () => {
        // Implement logout functionality here
    };

    const handleHelpSupport = () => {
        // Implement help and support functionality here
    };

    return (
        <View>
            <Text>Profile Info</Text>
            {/* Add editable user profile components here (avatar, name, email) */}

            <Text>App Preferences</Text>
            <View>
                <Text>Notifications</Text>
                <Switch
                    value={notificationsEnabled}
                    onValueChange={handleNotificationsToggle}
                />
            </View>
            <View>
                <Text>Dark Theme</Text>
                <Switch
                    value={darkThemeEnabled}
                    onValueChange={handleThemeToggle}
                />
            </View>

            <TouchableOpacity onPress={handleLogout}>
                <Text>Logout</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleHelpSupport}>
                <Text>Help & Support</Text>
            </TouchableOpacity>
        </View>
    );
};

export default SettingsScreen;