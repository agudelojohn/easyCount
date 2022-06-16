import { ButtonToolbar, ButtonGroup, Button } from "react-bootstrap";
import { BiCircle } from "react-icons/bi";
import { FcApproval } from "react-icons/fc";
import { Days, Meals } from "./EnumDays";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { setCurrentDay, setCurrentMeal } from "../recipes/RecipesSlide";

export function DaySelector() {
  const dispatch = useDispatch();
  let currentDay = useSelector((state) => state.recipes.currentDay);
  let currentMeal = useSelector((state) => state.recipes.currentMeal);
  let recipesPerDay = useSelector((state) => state.recipes.recipesPerDay);

  const week = new Map();
  week.set(Days.MONDAY, false);
  week.set(Days.TUESDAY, false);
  week.set(Days.WEDNESDAY, false);
  week.set(Days.THURSDAY, false);
  week.set(Days.FRIDAY, false);
  week.set(Days.SATURDAY, false);
  week.set(Days.SUNDAY, false);

  return (
    <div style={{ minHeight: "5%" }}>
      <h3>Day of the Week</h3>
      <ButtonToolbar aria-label="Toolbar with button groups">
        <ButtonGroup className="me-2" aria-label="First group">
          {week === undefined
            ? null
            : [...week.keys()].map((day) => {
                return (
                  <Button
                    key={day + week.get(day)}
                    onClick={() => dispatch(setCurrentDay(day))}
                    variant={currentDay === day ? "light" : "primary"}
                  >
                    {day}
                    {recipesPerDay[day].isReady === true ? (
                      <FcApproval />
                    ) : (
                      <BiCircle />
                    )}
                  </Button>
                );
              })}
        </ButtonGroup>
        <ButtonGroup size="sm" style={{ minWidth: "100%", marginTop: "10px" }}>
          <Button
            onClick={() => dispatch(setCurrentMeal(Meals.BREAKFAST))}
            variant={currentMeal === Meals.BREAKFAST ? "light" : "primary"}
          >
            Breakfast:{" "}
            {recipesPerDay[currentDay][Meals.BREAKFAST].isReady === true ? (
              <FcApproval />
            ) : (
              <BiCircle />
            )}
          </Button>
          <Button
            onClick={() => dispatch(setCurrentMeal(Meals.LUNCH))}
            variant={currentMeal === Meals.LUNCH ? "light" : "primary"}
          >
            Lunch:{" "}
            {recipesPerDay[currentDay][Meals.LUNCH].isReady === true ? (
              <FcApproval />
            ) : (
              <BiCircle />
            )}
          </Button>
          <Button
            onClick={() => dispatch(setCurrentMeal(Meals.DINNER))}
            variant={currentMeal === Meals.DINNER ? "light" : "primary"}
          >
            Dinner:{" "}
            {recipesPerDay[currentDay][Meals.DINNER].isReady === true ? (
              <FcApproval />
            ) : (
              <BiCircle />
            )}
          </Button>
        </ButtonGroup>
      </ButtonToolbar>
    </div>
  );
}
