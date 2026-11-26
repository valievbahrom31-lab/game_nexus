from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi import HTTPException
from pydantic import BaseModel

from sqlalchemy import create_engine,Column,Integer,String
from sqlalchemy.orm import declarative_base,sessionmaker,Session

DATABASE_URL = 'sqlite:///weapons.db'

engine = create_engine(
    DATABASE_URL,
    connect_args={'check_same_thread': False},
)

SessionLocal = sessionmaker(bind=engine)

Base = declarative_base()

class WeaponCreate(BaseModel):
    name: str
    damage: int
    range: int
    mobility: int
    handling: int
    recoil: int
    accuracy: int
    type: str
    image: str
    description: str


class WeaponUpdate(BaseModel):
    name: str | None = None
    damage: int | None = None
    range: int | None = None
    mobility: int | None = None
    handling: int | None = None
    recoil: int | None = None
    accuracy: int | None = None
    type: str | None = None
    image: str | None = None
    description: str | None = None

class WeaponResponse(BaseModel):
    id: int
    name: str
    damage: int
    range: int
    mobility: int
    handling: int
    recoil: int
    accuracy: int
    type: str
    image: str
    description: str

    class Config:
        from_attributes = True

class Weapon(Base):
    __tablename__ = 'weapons'

    id = Column(Integer,primary_key=True, index = True)
    name = Column(String)
    damage = Column(Integer)
    range = Column(Integer)
    mobility = Column(Integer)
    handling = Column(Integer)
    recoil = Column(Integer)
    accuracy = Column(Integer)
    type = Column(String)
    image = Column(String)
    description = Column(String)


Base.metadata.create_all(bind=engine)

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
def read_root():
    return {"status": "API is running"}


@app.get("/api/weapons",response_model=list[WeaponResponse])
def get_weapons(db: Session = Depends(get_db)):
    return db.query(Weapon).all()

@app.get("/api/weapons/{weapon_id}",response_model=WeaponResponse)
def get_weapon(weapon_id: int, db: Session = Depends(get_db)):
    weapon = db.query(Weapon).filter(Weapon.id == weapon_id).first()

    if weapon is None:
        raise HTTPException(
            status_code=404,
            detail= "Weapon not found"
        )

    return weapon

@app.post("/api/weapons")
def create_weapons(weapons: list[WeaponCreate], db: Session = Depends(get_db)):
    new_weapons = []
    for weapon in weapons:
        new_weapon = Weapon(**weapon.model_dump())

        db.add(new_weapon)
        new_weapons.append(new_weapon)

    db.commit()

    for weapon in new_weapons:
        db.refresh(weapon)

    return new_weapons

@app.delete("/api/weapons/{weapon_id}")
def delete_weapon(weapon_id: int,db: Session = Depends(get_db)):
    weapon = db.query(Weapon).filter(Weapon.id == weapon_id).first()

    if weapon is None:
        raise HTTPException(
            status_code=404,
            detail="Weapon not found"
        )

    db.delete(weapon)
    db.commit()

    return {"status": "Weapon successfully deleted"}

@app.patch("/api/weapons/{weapon_id}")
def update_weapon(
    weapon_id: int,
    weapon_data: WeaponUpdate,
    db: Session = Depends(get_db),
):
    weapon = db.query(Weapon).filter(Weapon.id == weapon_id).first()

    if weapon is None:
        raise HTTPException(
            status_code=404,
            detail="Weapon not found"
        )

    update_data = weapon_data.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(weapon,key,value)

    db.commit()
    db.refresh(weapon)

    return weapon