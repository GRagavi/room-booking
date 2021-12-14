import { useState } from 'react';
import './RoomBooking.css';
import { FaUsers, FaChild, FaBed, FaUser, FaMinusCircle, FaPlusCircle } from 'react-icons/fa';

const RoomBooking = () => {
	const [
		roomCount,
		setRoomCount
	] = useState(1);
	const [
		adultCount,
		setAdultCount
	] = useState(1);
	const [
		childrenCount,
		setChildrenCount
	] = useState(3);

	let hasPrevRoom = roomCount > 1;
	let hasNextRoom = roomCount < 5;

	let hasPrevAdult = adultCount > 1;
	let hasNextAdult = adultCount < 20;

	let hasPrevChildren = childrenCount > 0;
	let hasNextChildren = childrenCount < 15;

	let total = adultCount + childrenCount;
	let maxPersons = total < 20;

	function handleRoomDecreaseClick (){
		if (hasPrevRoom) {
			if (total > 4 * (roomCount - 1)) {
				let extra = total - 4 * (roomCount - 1);

				if (extra <= childrenCount && childrenCount >= 4) {
					console.log(childrenCount, extra);
					setChildrenCount((n) => n - 4);
				}
				else if (extra >= childrenCount) {
					setChildrenCount((n) => n - childrenCount);
				}
				if (extra - childrenCount > 0) {
					setAdultCount((n) => n - (extra - childrenCount));
				}
			}
			setRoomCount(roomCount - 1);
		}
	}
	function handleRoomIncreaseClick (){
		if (hasNextRoom) {
			if (adultCount > roomCount) {
				setRoomCount(roomCount + 1);
			}
			else {
				setRoomCount(roomCount + 1);
				setAdultCount(adultCount + 1);
			}
		}
	}
	function handleAdultDecreaseClick (){
		if (hasPrevAdult) {
			if (roomCount > adultCount - 1) {
				setRoomCount(roomCount - 1);
			}
			if ((roomCount - 1) * 4 < total - 1) {
				let extra = total - (roomCount - 1) * 4;

				if (extra <= childrenCount && childrenCount >= 4) {
					console.log(childrenCount, extra);
					setChildrenCount((n) => n - 4);
				}
				else if (extra <= childrenCount) {
					setChildrenCount((n) => n - extra);
				}
				else if (extra >= childrenCount) {
					setChildrenCount((n) => n - childrenCount);
				}
				if (extra - childrenCount > 0) {
					if (adultCount > 5) {
						setAdultCount((n) => n - (extra - childrenCount));
					}
					else {
						setAdultCount((n) => n - (extra - childrenCount - 1));
					}
				}
				// setAdultCount(adultCount-1);
			}
			else {
				setRoomCount(roomCount - 1);
				setAdultCount(adultCount - 1);
			}
		}
	}
	function handleAdultIncreaseClick (){
		if (hasNextAdult && total < 20) {
			if (total + 1 > roomCount * 4) {
				setRoomCount(roomCount + 1);
				setAdultCount(adultCount + 1);
			}
			else {
				setAdultCount(adultCount + 1);
			}
		}
	}
	function handleChildrenDecreaseClick (){
		if (hasPrevChildren) {
			if ((roomCount - 1) * 4 < total - 1) {
				setChildrenCount(childrenCount - 1);
			}
			else {
				setRoomCount(roomCount - 1);
				setChildrenCount(childrenCount - 1);
			}
			//setAdultCount(adultCount-1);
		}
	}
	function handleChildrenIncreaseClick (){
		if (hasNextChildren && total < 20) {
			if (total + 1 > roomCount * 4) {
				if (roomCount + 1 !== adultCount) {
					setAdultCount(adultCount + 1);
				}
				setRoomCount(roomCount + 1);
				setChildrenCount(childrenCount + 1);
			}
			else {
				setChildrenCount(childrenCount + 1);
			}
		}
	}
	return (
		<div className="primary">
			<h2>
				<span className="icon">
					<FaUsers />
				</span>&nbsp;&nbsp;Choose Number of <span className="icon">people</span>{' '}
			</h2>
			<table className="tab">
				<tr className="row">
					<td className="cell">
						<span className="icon">
							<FaBed />{' '}
						</span>&nbsp;&nbsp;ROOMS{' '}
					</td>
					<td>
						{' '}
						<span onClick={handleRoomDecreaseClick} disabled={!hasPrevRoom}>
							<FaMinusCircle
								size={30}
								color={

										!hasPrevRoom ? 'grey' :
										'rgb(12, 12, 143)'
								}
							/>
						</span>
						&nbsp;&nbsp;{roomCount}&nbsp;&nbsp;
						<span onClick={handleRoomIncreaseClick} disabled={!hasNextRoom}>
							<FaPlusCircle
								size={30}
								color={

										!hasNextRoom ? 'grey' :
										'rgb(209, 9, 9)'
								}
							/>
						</span>
					</td>
				</tr>
				<tr className="row">
					<td className="cell">
						<span className="icon">
							<FaUser />{' '}
						</span>&nbsp;&nbsp;ADULTS{' '}
					</td>
					<td>
						<span onClick={handleAdultDecreaseClick} disabled={!hasPrevAdult}>
							<FaMinusCircle
								size={30}
								color={

										!hasPrevAdult ? 'grey' :
										'rgb(12, 12, 143)'
								}
							/>
						</span>
						&nbsp;&nbsp;{adultCount}&nbsp;&nbsp;
						<span onClick={handleAdultIncreaseClick} disabled={!hasNextAdult || !maxPersons}>
							<FaPlusCircle
								size={30}
								color={

										!hasNextAdult || !maxPersons ? 'grey' :
										'rgb(209, 9, 9)'
								}
							/>
						</span>
					</td>
				</tr>
				<tr className="row">
					<td className="cell">
						<span className="icon">
							<FaChild />{' '}
						</span>&nbsp;&nbsp;CHILDREN
					</td>
					<td>
						<span onClick={handleChildrenDecreaseClick} disabled={!hasPrevChildren}>
							<FaMinusCircle
								size={30}
								color={

										!hasPrevChildren ? 'grey' :
										'rgb(12, 12, 143)'
								}
							/>
						</span>&nbsp;&nbsp;
						{childrenCount}&nbsp;&nbsp;
						<span onClick={handleChildrenIncreaseClick} disabled={!hasNextChildren || !maxPersons}>
							<FaPlusCircle
								size={30}
								color={

										!hasNextChildren || !maxPersons ? 'grey' :
										'rgb(209, 9, 9)'
								}
							/>
						</span>
					</td>
				</tr>
			</table>
		</div>
	);
};

export default RoomBooking;
