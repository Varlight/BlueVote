//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract VotingSystem {
    // Declaration of state variables
    address public admin;
    uint256 public totalVotes;

    // Mapping to keep track of registered voters and their voting status
    mapping(address => bool) public isRegistered;
    mapping(address => bool) public hasVoted;
    mapping(uint256 => uint256) public voteCount;

    // Events for logging important actions on the blockchain
    event VoterRegistered(address indexed voter);
    event CandidateAdded(uint256 indexed candidateId, string candidateName);
    event Voted(address indexed voter, uint256 indexed candidate);

    // Modifiers to control access to specific functions
    modifier onlyAdmin() {
        require(msg.sender == admin, 'Only admin can perform this action');
        _;
    }

    modifier hasNotVoted() {
        require(!hasVoted[msg.sender], 'You have already voted');
        _;
    }

    modifier isRegisteredVoter() {
        require(isRegistered[msg.sender], 'You are not a registered voter');
        _;
    }

    // Constructor function to set the admin address when the contract is deployed
    constructor() {
        admin = msg.sender;
    }

    // Function to allow voters to register themselves
    function registerVoter() external {
        require(
            !isRegistered[msg.sender],
            'You are already a registered voter'
        );
        isRegistered[msg.sender] = true;
        emit VoterRegistered(msg.sender);
    }

    // Function to allow the admin to add candidates
    function addCandidate(
        uint256 candidateId,
        string memory candidateName
    ) external onlyAdmin {
        // Ensure the candidate ID does not already exist
        require(
            candidateId > 0 && voteCount[candidateId] == 0,
            'Invalid candidate ID'
        );

        // Add the candidate
        emit CandidateAdded(candidateId, candidateName);
    }

    // Function to allow voters to cast their votes
    function vote(uint256 candidate) external hasNotVoted isRegisteredVoter {
        // Ensure the candidate exists
        require(candidate > 0 && voteCount[candidate] > 0, 'Invalid candidate');

        // Record the vote
        voteCount[candidate]++;
        hasVoted[msg.sender] = true;
        totalVotes++;

        // Emit the vote event
        emit Voted(msg.sender, candidate);
    }

    // Function to get the vote count for a specific candidate
    function getVoteCount(uint256 candidate) external view returns (uint256) {
        // Get the vote count for a specific candidate
        return voteCount[candidate];
    }
}
