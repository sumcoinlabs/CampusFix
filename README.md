# CampusFix

CampusFix is a clean-room React Native / Expo demo that models a two-sided facilities request workflow.

It is designed as a practical mobile development demo showing how a request-management app can support both public users and internal staff using a cross-platform React Native architecture.

## What it does now

CampusFix currently includes a functional local workflow:

- Demo resident login
- Demo staff/admin login
- Local demo account creation
- Request creation
- Duplicate issue follow workflow
- My Requests list that updates after submission
- Staff queue that updates after submission
- Staff assignment actions
- Status updates
- Public updates
- Internal staff notes
- Dashboard metrics
- Local persistence with AsyncStorage

## Demo roles

### Resident

Residents can create a facility issue, follow a similar existing issue, submit a new issue, view public updates, and track request status.

### Staff Admin

Staff users can view dashboard metrics, review the staff queue, filter requests, assign a request, update status, add public updates, and add internal notes.

## Tech stack

- Expo
- React Native
- TypeScript
- Expo Router
- AsyncStorage
- Local mock data/state

## Why this project exists

The purpose of CampusFix is to demonstrate fast React Native ramp-up, mobile product thinking, and understanding of request-management workflows.

The app intentionally uses a campus/facilities scenario so it remains independent and does not copy any company product, branding, customer implementation, or proprietary system.

## Run locally

npm install

npx expo start

Then open with Expo Go, iOS Simulator, Android Emulator, or web preview.

## Current limitations

This is still a demo app. It does not yet include real backend authentication, cloud database persistence, photo upload, device location capture, push notifications, or production permissions.

Those would be the next implementation phases.
