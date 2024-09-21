import React, { useState } from 'react';

const InviteMemberScreen: React.FC = () => {
    const [email, setEmail] = useState('');
    const [invitedMembers, setInvitedMembers] = useState<string[]>([]);
    const [invitationCode, setInvitationCode] = useState('');

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleSendInvite = () => {
        // Logic to send invite
        setInvitedMembers([...invitedMembers, email]);
        setEmail('');
    };

    const handleCopyCode = () => {
        // Logic to copy invitation code
        // setInvitationCode(code);
    };

    return (
        <div>
            <h1>Invite Members</h1>
            <input type="email" value={email} onChange={handleEmailChange} placeholder="Enter email" />
            <button onClick={handleSendInvite}>Send Invite</button>
            <div>
                <h2>Invited Members</h2>
                <ul>
                    {invitedMembers.map((member, index) => (
                        <li key={index}>{member}</li>
                    ))}
                </ul>
            </div>
            <div>
                <h2>Invitation Code</h2>
                <p>{invitationCode}</p>
                <button onClick={handleCopyCode}>Copy Code</button>
            </div>
        </div>
    );
};

export default InviteMemberScreen;